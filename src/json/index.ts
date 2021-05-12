import _ from 'lodash'
import {file} from '../utils'

interface Params {
  path: string | null;
  content: {
    [k: string]: any
  } | null;
  read(path: string): Params;
  get(key: string): any;
  set(key: string, value: string): Params;
  save(path: string): Params;
}

export default {
  path: null,
  content: null,
  read(path: string) {
    this.path = path
    this.content = JSON.parse(file.read(this.path).content)

    return this
  },
  get(key: string) {
    return _.get(this.content, key)
  },
  set(key: string, value: string) {
    if (typeof value !== undefined) {
      _.set(this.content, key, value)
    }

    return this
  },
  save(path: string) {
    file.save(path ?? this.path, this.content)

    return this
  }
} as Params
