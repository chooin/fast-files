import {readFileSync, writeFileSync} from 'fs'

interface Params {
  exists: boolean;
  content: string | null;
  read(path: string): Params;
  save(path: string, content: string): Params;
}

export default {
  exists: true,
  content: null,
  read(path: string) {
    try {
      this.content = readFileSync(path, 'utf-8')
    } catch (error) {
      if (error.code === 'ENOENT') {
        this.exists = false
      } else {
        throw error
      }
    }

    return this
  },
  save(path: string, content: string) {
    writeFileSync(path, content ?? this.content, {
      encoding: 'utf-8'
    })
  }
} as Params
