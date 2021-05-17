# fast-files

### json

##### parse

```js
import path from 'path'
import {json} from 'fast-files'

json().readFile(path.resolve(__dirname, './json.json')).parse
// {
//   content: 'content'
// }
```

##### change

```js
import path from 'path'
import {json} from 'fast-files'

const file = json().readFile(path.resolve(__dirname, './json.json'))
file.set('number', 1024)
file.set('object.number', 2048)
file.parse
// {
//   number: 1024,
//   object: {
//     number: 2048
//   }
// }
```

#### save

```js
import path from 'path'
import {json} from 'fast-files'

const file = json().readFile(path.resolve(__dirname, './json.json'))
file.set('number', 1024)
file.set('object.number', 2048)
file.saveFile()
```
