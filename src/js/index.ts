import $ from 'gogocode'
import * as t from '@babel/types';
import {file} from '../utils';

interface Js {
  path: string;
  ast: any;
  readFile(path: string): Js;
  replace(selector: string | t.Node, replacer: string | t.Node): Js;
  get(): void;
  saveFile(
    path?: string | null,
    options?: {
      override?: boolean;
    }): Js;
}

/**
 * @public
 */
export default (): Js => {
  return {
    path: '',
    ast: null,
    readFile(path) {
      try {
        const f = file.readFile(path)
        if (f.exists) {
          this.ast = $(f.parsed)
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
      this.ast = this.ast
        .replace(selector, replacer)

      return this
    },
    get() {
      return this.ast
        .root()
        .generate();
    },
    saveFile(
      path: string,
      options= {},
    ) {
      path = path ?? this.path
      const {
        override = false,
      } = options
      const data = this.ast
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
    },
  }
}
