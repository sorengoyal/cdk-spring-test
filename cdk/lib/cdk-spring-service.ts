import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as path from "path";

export class CdkSpringService extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

//   const bundlingOptions = {
//     bundling: {
//         image: lambda.Runtime.JAVA_17.bundlingImage,
//                 command: [
//                     "/bin/sh",
//                     "-c",
//                     ["cd /asset-input/ ",
//                         "./mvnw clean package -P lambda -DskipTests ",
//                         "cp /asset-input/target/spring-petclinic-rest-2.4.2-aws.jar /asset-output/"].join(" && ")
//                 ],
//                 outputType: BundlingOutput.ARCHIVED,
//                 user: 'root',
//                 volumes: [{hostPath: `${homedir()}/.m2`, containerPath: '/root/.m2/'}]
//             }
//         };
    const envVariables = {
                'VARIABLE_NAME': `VARIABLE_VALUE`
            }

    const baseProps = {
//         vpc: props?.vpc,
        runtime: lambda.Runtime.JAVA_17,
        code: lambda.Code.fromAsset(path.join(__dirname, '../../build/libs/cdkspringapp-0.0.2-SNAPSHOT-aws.jar')),
        handler: 'org.springframework.cloud.function.adapter.aws.FunctionInvoker',
//         vpcSubnets: {
//             subnetType: ec2.SubnetType.PRIVATE
//         },
        memorySize: 512,
        timeout: cdk.Duration.seconds(15),
//         securityGroups: [lambdaSecurityGroup]
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