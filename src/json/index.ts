import _ from 'lodash'
import {file} from '../utils'

interface Json {
  path: string;
  parsed: {
    [k: string]: any
  };
  get(key: string): any | void;
  set(key: string, data: any): Json;
  merge(data: {
    [k: string]: any
  }): Json;
  readFile(path: string): Json;
  saveFile(
    path?: string | null,
    options?: {
      override?: boolean;
      space?: number;
    }): Json;
}

/**
 * @public
 */
export default (): Json => {
  return {
    path: '',
    parsed: {},
    get(key) {
      if (!_.isUndefined(key)) {
        return _.get(this.parsed, key)
      }
    },
    set(key, data) {
      if (!_.isUndefined(data)) {
        _.set(this.parsed, key, data)
      }

      return this
    },
    merge(data) {
      this.parsed = _.merge(this.parsed, data)

      return this
    },
    readFile(path) {
      try {
        const f = file.readFile(path)
        if (f.exists) {
          const parsed = JSON.parse(f.parsed)
          if (_.isObject(parsed)) {
            this.parsed = parsed
            this.path = path
          } else {
            new TypeError(`File ${path} is not a JSON`)
          }
        } else {
          new Error(`File ${path} not found`)
        }
      } catch (e) {
        throw e.message
      }

      return this
    },
    saveFile(
      path,
      options = {}
    ) {
      path = path ?? this.path
      const {
        override = false,
        space = 2
      } = options
      const data = JSON.stringify(this.parsed, null, space)
      file.saveFile(
        path,
        data,
        {
          override,
        }
      )

      return this
    }
  }
}
