# jeteo-web

## Development

### Instalation

* Clone this repo
* Install nodejs
  * Node Version Manager
  ```bash
  nvm use
  ```
  * *or install nodejs not older than presented in `.nvmrc`*
* `npm install`


### Dev Server

```bash
npm run dev
```

## Deployment

### Configuration
We recommend using the prepared Docker image [>link< ](https://github.com/Newbies-Workplace/jeteo-web/pkgs/container/jeteo-web)

### Docker
Here's [image link](https://github.com/Newbies-Workplace/jeteo-web/pkgs/container/jeteo-web).
```bash
docker run --name web -e API_URL=https://api.domain.tld jeteo-web:latest
```

### Enviroment Varables
| Name     | Description    | Example Value           |
| -------- | -------------- | ------------------------|
| API_URL  | Api's url      | https://api.domain.tld  |