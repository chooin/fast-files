import $ from 'gogocode'
import {file, isObject} from "../utils";

interface JS {
  path: string;
  parsed: string;
  readFile(path: string): JS;
  saveFile(
    path?: string,
    options?: {
      override?: boolean;
    }): JS;
}

export default (): JS => {
  return {
    path: '',
    parsed: '',
    readFile(path) {
      try {
        const f = file.readFile(path)
        if (f.exists) {
          const parsed = JSON.parse(f.parsed)
          if (isObject(parsed)) {
            this.parsed = parsed
            this.path = path
          } else {
            new TypeError(`File ${path} is not a JS`)
          }
        } else {
          new Error(`File  ${path} not found`)
        }
      } catch (e) {
        throw e.message
      }
      return this
    },
    saveFile(path: string, options) {
      return this
    }
  }
}
