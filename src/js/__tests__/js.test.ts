import * as path from 'path'
import {js} from '../../index'

test('read js files', () => {
  const jsContent = js()
    .readFile(path.resolve(__dirname, './index.md'))
    .replace('var a = 2', 'var bx = 2')
    .saveFile(null, {
      override: true
    })
})
