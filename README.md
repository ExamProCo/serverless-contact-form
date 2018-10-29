## Docker Lambda

To easy debugging we're using [docker-lamba](https://github.com/lambci/docker-lambda)
To run the lamba in the docker container we run the command as follows:

eg.

docker run --rm -v "$PWD":/var/task lambci/lambda:nodejs8.10 index.handler '{"testing": "testing"}'

To simplify this process we create a script called `test.js` that makes
it easier to pass along json files to the docker container.

You can run the container via:

`npm test`
