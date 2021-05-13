import {readFileSync, writeFileSync} from 'fs'

interface Params {
  exists: boolean;
  parsed: string;
  readFile(path: string): Params;
  saveFile(path: string, value: string): void;
}

export default (): Params => {
  return {
    exists: true,
    parsed: '',
    readFile(path) {
      try {
        this.parsed = readFileSync(path, 'utf-8')
      } catch (error) {
        if (error.code === 'ENOENT') {
          this.exists = false
        } else {
          throw error
        }
      }

      return this
    },
    saveFile(path, value) {
      writeFileSync(path, value ?? this.parsed, {
        encoding: 'utf-8'
      })
    }
  }
}
