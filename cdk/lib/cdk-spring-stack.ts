import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cdk_spring_service from '../lib/cdk-spring-service'
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkSpringStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new cdk_spring_service.CdkSpringService(this, 'CdkSpringService');
  }
}