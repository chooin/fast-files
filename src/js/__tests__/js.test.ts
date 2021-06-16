import * as path from 'path'
import {js} from '../../index'

test('read js files', () => {
  js()
    .readFile(path.resolve(__dirname, './index.md'))
    .replace('const $_$1 = require($_$2)', 'import $_$1 from $_$2')
    .saveFile(path.resolve(__dirname, './index.mdd'), {
      override: true
    })
})
