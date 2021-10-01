# jeteo-web

## Instalation

* Clone this repo
* Install nodejs
* Install nodejs<br/>
  * For linux users
  ```bash
  nvm use
  ```
  * For windows folks<br/>
    * `install newest nodejs from official website` (and u ready) 
    <br/>or
    *  `nvm-windows` and then
    ```batch
    nvm use [paste here version from .nvmrc] 
    ```
* npm i

## Development

1. init git hooks (husky) <br/>
this will test and lint changes before commiting
```bash
npm run prepare
```
2. run dev server ig...
```bash
npm run dev
```