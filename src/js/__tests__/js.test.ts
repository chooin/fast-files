import path from 'path'
import {removeSync} from 'fs-extra'
import {js} from '../../index'
import dayjs from 'dayjs'

test('read js files', () => {
  const jsContent = js().readFile(path.resolve(__dirname, './read.js'))

  console.log(jsContent)
})
