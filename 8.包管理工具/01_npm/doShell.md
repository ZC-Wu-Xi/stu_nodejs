`npm init`

shell控制台：

```shell
PS D:\workspace\stuspace\webObject\nodejs\nodejs-shangguigu\8.包管理工具\01_npm> npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

sible defaults.

See `npm help init` for definitive documentation on these fields
and exactly what they do.     

Use `npm install <pkg>` afterwards to install a package and 
save it as a dependency in the package.json file.

Press ^C at any time to quit. 
package name: (01_npm) test   
version: (1.0.0) 1.0.0        
description: 学习npm
entry point: (index.js)       
test command:                 
git repository:               
keywords:                     
author:                       
license: (ISC)                
About to write to D:\workspace\stuspace\webObject\nodejs\nodejs-shangguigu\8.包管理工具\01_npm\package.json:

{
  "name": "test",
  "description": "学习npm",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
Is this OK? (yes)
```

package.json:

```
{
  "name": "test",
  "version": "1.0.0",
  "description": "学习npm",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}