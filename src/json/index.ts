import _ from 'lodash'
import {file, isDefined, isObject} from '../utils'

interface Params {
  path: string | null;
  value: {
    [k: string]: any
  } | null;
  getValue(key?: string): any;
  setValue(key: string, value: any): Params;
  merge(value: {
    [k: string]: any
  }): Params;
  readFile(path: string): Params;
  saveFile(path?: string): Params;
}

export default {
  path: null,
  value: null,
  getValue(key?: string) {
    if (isDefined(key)) {
      return _.get(this.value, key)
    } else {
      return this.value
    }
  },
  setValue(key: string, value: any) {
    if (isDefined(value)) {
      _.set(this.value, key, value)
    }

    return this
  },
  merge(value: {
    [k: string]: any
  }) {
    this.value = _.merge(this.value, value)

    return this
  },
  readFile(path: string) {
    try {
      this.path = path
      let value = file.readFile(this.path).getValue()
      value = JSON.parse(value)
      if (isObject(value)) {
        this.value = value
      } else {
        new Error()
      }
    } catch (e) {
      throw e
    }

    return this
  },
  saveFile(path?: string) {
    path = path ?? this.path
    const value = JSON.stringify(this.value, null, 2)
    file.saveFile(
      path,
      value,
    )

    return this
  }
} as Params
