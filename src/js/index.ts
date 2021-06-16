import $ from 'gogocode'
import * as t from '@babel/types';
import {file} from '../utils';

interface JS {
  path: string;
  parsed: any;
  readFile(path: string): JS;
  replace(selector: string | t.Node, replacer: string | t.Node): JS;
  saveFile(
    path?: string | null,
    options?: {
      override?: boolean;
    }): JS;
}

export default (): JS => {
  return {
    path: '',
    parsed: null,
    readFile(path) {
      try {
        const f = file.readFile(path)
        if (f.exists) {
          this.parsed = $(f.parsed)
          this.path = path
        } else {
          new Error(`File ${path} not found`)
        }
      } catch (e) {
        throw e.message
      }

      return this
    },
    replace(selector, replacer) {
      this.parsed = this.parsed
        .replace(selector, replacer)

      return this
    },
    saveFile(
      path: string,
      options= {},
    ) {
      path = path ?? this.path
      const {
        override = false,
      } = options
      const data = this.parsed
        .root()
        .generate();

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
