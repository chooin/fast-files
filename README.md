# fast-files

### JSON

##### parse JSON files

```js
import path from 'path'
import {json} from 'fast-files'

json().readFile(path.resolve(__dirname, './json.json')).parsed
// {
//   content: 'content'
// }
```

##### change JSON files

```js
import path from 'path'
import {json} from 'fast-files'

const file = json().readFile(path.resolve(__dirname, './json.json'))
file.set('number', 1024)
file.set('object.number', 2048)
file.parsed
// {
//   number: 1024,
//   object: {
//     number: 2048
//   }
// }
file.merge({
  number: 2048,
  boolean: false
})
file.parsed
// {
//   number: 2048,
//   object: {
//     number: 2048
//   },
//   boolean: false
// }
```

#### create JSON files

```js
import path from 'path'
import {json} from 'fast-files'

file.set('number', 1024)
file.set('object.number', 2048)
file.parsed
// {
//   number: 1024,
//   object: {
//     number: 2048
//   }
// }
```

#### save JSON files

```js
import path from 'path'
import {json} from 'fast-files'

const file = json().readFile(path.resolve(__dirname, './json.json'))
file.set('number', 1024)
file.set('object.number', 2048)
file.saveFile()
```
