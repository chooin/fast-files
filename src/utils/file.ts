import {readFileSync, writeFileSync} from 'fs'

interface File {
  exists: boolean;
  parsed: string;
  readFile(path: string): File;
  saveFile(path: string, value: string): File;
}

export default (): File => {
  return {
    exists: true,
    parsed: '',
    readFile(path) {
      try {
        this.parsed = readFileSync(path, 'utf-8')
      } catch (e) {
        if (e.code === 'ENOENT') {
          this.exists = false
        } else {
          throw e
        }
      }

      return this
    },
    saveFile(path, value) {
      writeFileSync(path, value ?? this.parsed, {
        encoding: 'utf-8'
      })

      return this
    }
  }
}
