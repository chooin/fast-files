import _ from 'lodash'
import {file, isDefined, isObject} from '../utils'

interface Json {
  path: string;
  parsed: {
    [k: string]: any
  };
  get(key?: string): any | void;
  set(key: string, value: any): Json;
  merge(value: {
    [k: string]: any
  }): Json;
  readFile(path: string): Json;
  saveFile(path?: string): Json;
}

export default (): Json => {
  return {
    path: '',
    parsed: {},
    get(key) {
      if (isDefined(key)) {
        // @ts-ignore
        return _.get(this.parsed, key)
      }
    },
    set(key, value) {
      if (isDefined(value)) {
        // @ts-ignore
        _.set(this.parsed, key, value)
      }

      return this
    },
    merge(value) {
      this.parsed = _.merge(this.parsed, value)

      return this
    },
    readFile(path) {
      try {
        this.path = path
        let value = file().readFile(this.path).parsed
        value = JSON.parse(value)
        if (isObject(value)) {
          // @ts-ignore
          this.parsed = value
        } else {
          new Error()
        }
      } catch (e) {
        throw e
      }

      return this
    },
    saveFile(path) {
      // @ts-ignore
      path = (path ?? this.path) as string
      const value = JSON.stringify(this.parsed, null, 2)
      file().saveFile(
        path,
        value,
      )

      return this
    }
  }
}
