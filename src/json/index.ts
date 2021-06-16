import _ from 'lodash'
import {file, isDefined, isObject} from '../utils'

interface JSON {
  path: string;
  parsed: {
    [k: string]: any
  };
  get(key: string): any | void;
  set(key: string, data: any): JSON;
  merge(data: {
    [k: string]: any
  }): JSON;
  readFile(path: string): JSON;
  saveFile(
    path?: string,
    options?: {
      override?: boolean;
      space?: number;
    }): JSON;
}

export default (): JSON => {
  return {
    path: '',
    parsed: {},
    get(key) {
      if (isDefined(key)) {
        return _.get(this.parsed, key)
      }
    },
    set(key, data) {
      if (isDefined(data)) {
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
          if (isObject(parsed)) {
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
