# Todo-golang-react
A simple, dockerized, golang RESTful API with react frontend.

Golang RESTful API based on [this tutorial](https://medium.com/@thedevsaddam/build-restful-api-service-in-golang-using-gin-gonic-framework-85b1a6e176f3)

### Commands
*Note*: You will need to `yarn install` and `yarn build` before running the containers. The ui container copies the `build/` directory.

```bash
# build app/ui docker images
$ make build

# start app/ui containers
$ make up

# rebuild app/ui images
$ make rebuild
```

#### Accessible via:
* Frontend - http://localhost:8080
* API - http://localhost:5001/api/v1/todos/