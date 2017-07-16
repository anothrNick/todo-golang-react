# iron/go:dev is the alpine image with the go tools added
FROM iron/go:dev

WORKDIR /app

# Set an env var that matches github repo name
ENV SRC_DIR=/go/src/github.com/anothrnick/todo-golang-react/

# Add the source code:
ADD app/* $SRC_DIR

# Build it:
RUN cd $SRC_DIR; go get github.com/gin-gonic/gin; go get github.com/jinzhu/gorm; go get github.com/jinzhu/gorm/dialects/sqlite; go build -o todo-app; cp todo-app /app/;

ENTRYPOINT ["./todo-app"]