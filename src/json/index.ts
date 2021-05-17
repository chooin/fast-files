import _ from 'lodash'
import {file, isDefined, isObject} from '../utils'

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
    path?: string,
    options?: {
      override: boolean;
    }): Json;
}

export default (): Json => {
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
            throw `It's not a JSON file: ${path}`
          }
        } else {
          throw `File not found: ${path}`
        }
      } catch (e) {
        throw e
      }
      return this
    },
    saveFile(
      path,
      options
    ) {
      path = path ?? this.path
      const data = JSON.stringify(this.parsed, null, 2)
      file.saveFile(
        path,
        data,
        options
      )

      return this
    }
  }
}
