## How to Use

Get the dependencies for function

```
cd function
npm install
```

Get the dependencies or the web page and serve the page

```
cd web
npm install
npm start
```

## How to Deploy

Serverless Application Model (SAM) is used for IaC.

You need to have the [SAM CLI installed](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)

If you already have the SAM CLI installed, consider checking if it
requires an update.

rename `config.toml.example` to `config.toml`

You will need to update the toml file for:
- stack_name


```
sam deploy \
  --stack-name ServerlessContactForm \
  --profile default
```


## Docker Lambda

To easy debugging we're using [docker-lamba](https://github.com/lambci/docker-lambda)
To run the lamba in the docker container we run the command as follows:

eg.

docker run --rm -v "$PWD":/var/task lambci/lambda:nodejs8.10 index.handler '{"testing": "testing"}'

To simplify this process we create a script called `test.js` that makes
it easier to pass along json files to the docker container.

You can run the container via:

`npm test`

