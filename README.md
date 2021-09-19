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

rename `samconfig.toml.example` to `samconfig.toml` and change the
configuration to your needs.



You need a bucket for your S3 artifact

```
aws s3api create-bucket  --bucket serverless-contact-form-artifacts --region us-east- --profile default
```

> remember that S3 buckets are like domain names. you'll have to find
> your to choose a name not already taken.


Build package and deploy

```
sam build
sam package --s3-bucket=serverless-contact-form-artifacts --profile default
sam deploy --s3-bucket=serverless-contact-form-artifacts --profile default
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

