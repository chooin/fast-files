import {readFileSync, writeFileSync} from 'fs'

interface Params {
  exists: boolean;
  value: string | null;
  getValue(): string;
  readFile(path: string): Params;
  saveFile(path: string, value: string): Params;
}

export default {
  exists: true,
  value: null,
  getValue() {
    return this.value
  },
  readFile(path: string) {
    try {
      this.value = readFileSync(path, 'utf-8')
    } catch (error) {
      if (error.code === 'ENOENT') {
        this.exists = false
      } else {
        throw error
      }
    }

    return this
  },
  saveFile(path: string, value: string) {
    writeFileSync(path, value ?? this.value, {
      encoding: 'utf-8'
    })
  }
} as Params
