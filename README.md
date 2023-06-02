## BUILD
```shell
## First Time
cd cdk
npm install

## For every Build (start at root)
./gradlew build
cd cdk
cdk synth
cdk deploy

```


### References
CDK Docs: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda-readme.html
Sample CDK Project: https://github.com/sorengoyal/cdk-experiment
Sample Spring Project: https://github.com/sorengoyal/spring-serverless-test