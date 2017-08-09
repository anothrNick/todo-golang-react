# Todo-golang-react
A simple, dockerized, golang RESTful API with react frontend.

Golang RESTful API based on [this tutorial](https://medium.com/@thedevsaddam/build-restful-api-service-in-golang-using-gin-gonic-framework-85b1a6e176f3)

### Commands (container)
*Note*: You will need to `yarn install` and `yarn build` before running the containers. The ui container copies the `build/` directory.

```bash
# build app/ui docker images
$ make build

# start app/ui containers
$ make up

# rebuild app/ui images
$ make rebuild
```

For now, to run locally:
```bash
# install dependencies
$ yarn install

# start frontend dev server
$ yarn start

# build backend go app
$ docker-compose build app

# run app
$ docker-compose run app

# navigate to http://localhost:8080 in your browser
```

#### Accessible via:
* Frontend - http://localhost:8080
* API - http://localhost:5001/api/v1/todos/


#### TODO:
* Get `API_HOST` env var in react app