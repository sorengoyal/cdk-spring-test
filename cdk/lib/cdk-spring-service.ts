import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as path from "path";
import * as fs from "fs";

export class CdkSpringService extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);
    const envVariables = {
                'VARIABLE_NAME': `VARIABLE_VALUE`
            }
    const root_dir = path.join(__dirname, '../../');
    const buildGradle_content = fs.readFileSync(path.join(root_dir, 'build.gradle'), 'utf-8');
    const version = buildGradle_content.match(/version\s*=\s*['"]([^'"]*)['"]/)?.[1];
    if (!version) {
        console.log('Version not found');
        process.exit();
    }
    const jar_name = 'cdkspringapp-'.concat(version).concat('-aws.jar');
    const baseProps = {
        runtime: lambda.Runtime.JAVA_17,
        code: lambda.Code.fromAsset(path.join(root_dir, 'build/libs/'.concat(jar_name))),
        handler: 'org.springframework.cloud.function.adapter.aws.FunctionInvoker',
        memorySize: 512,
        timeout: cdk.Duration.seconds(15),
        }
    const bucket = new s3.Bucket(this, "RigelStore");

    const cdkSpringLambda = new lambda.Function(this, "CdkSpringTestFunction", {
      ...baseProps,
      functionName: 'cdk-spring-test-function',
      environment: {
        ...envVariables
      }
    });

    bucket.grantReadWrite(cdkSpringLambda);

    const api = new apigateway.RestApi(this, "CdkSpringTestApi", {
      restApiName: "CdkSpringTestApi",
      description: "An api to test integration with a Lambda running a spring application."
    });

    const cdkSpringTestIntegration = new apigateway.LambdaIntegration(cdkSpringLambda, {
      requestTemplates: { "application/text": '{ "statusCode": "200" }' }
    });

    api.root.addMethod("GET", cdkSpringTestIntegration); // GET /

//      const widget = api.root.addResource("{id}");

     const lambdaIntegration = new apigateway.LambdaIntegration(cdkSpringLambda);

//      widget.addMethod("POST", widgetIntegration);   // POST /{id}
//      widget.addMethod("GET", widgetIntegration);    // GET /{id}
//      widget.addMethod("DELETE", widgetIntegration); // DELETE /{id}
  }
}