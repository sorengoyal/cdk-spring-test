# Setup

## CDK Setup
1. Install AWS CLI. [Link](https://aws.amazon.com/cli/)
2. Install NPM [Link](https://nodejs.org/en)
3. Install CDK CLI. [Link](https://docs.aws.amazon.com/cdk/v2/guide/work-with.html#work-with-prerequisites)
```shell
sudo npm install -g aws-cdk
```
4. npm install -g typescript

## Java setup
Install Java 17 Coretto
gradle 7.6.1

## Project Setup
```shell
## First Time
cd cdk
npm install # Creates nodes_modules dir
cdk bootstrap aws://707690211600/us-east-2 # Creates a S3 bucket required for CDK based deployments
```

# Build and Deploy
```shell
## For every Build (start at root)
./gradlew build # Jar with "-aws" suffix is used for aws deployments, the other one can be run locally
cd cdk
cdk synth
cdk deploy
```

# Test Locally
```shell
./gradlew bootRun
```


### References
CDK Docs: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda-readme.html
Sample CDK Project: https://github.com/sorengoyal/cdk-experiment
Sample Spring Project: https://github.com/sorengoyal/spring-serverless-test