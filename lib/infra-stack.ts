import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as path from 'path';
import * as cw from 'aws-cdk-lib/aws-cloudwatch';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as apigw from 'aws-cdk-lib/aws-apigateway';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const tags1: cdk.CfnTag = {
      key: 'project',
      value: 'udemy'
    }

    //IAM Role
    const ibank_role = new iam.Role(this, 'ibank_iam', {
      description: 'IAM role for lambda to access s3 bucket',
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    })

    ibank_role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3ReadOnlyAccess'));

    const bal_bucket = new s3.Bucket(this, 'BalanceS3', {
      versioned: true,
      autoDeleteObjects: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    })

    const demoLambda = new NodejsFunction(this, 'demoLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'handler',
      entry: path.join(__dirname, '../service/ibank.ts'),
      environment: {
        IBANK_BUCKET: bal_bucket.bucketName,
        IBANK_FILE_KEY: 'accountStatus.json'
      },
      role: ibank_role,
    })

    const gateway = new apigw.LambdaRestApi(this, 'gateway', {
      handler: demoLambda,
      deploy: true,
      proxy: false
    });
    gateway.root.addResource('bank-statement').addMethod('GET', new apigw.LambdaIntegration(demoLambda))


    // bal_bucket.grantReadWrite(ibank_role)

    // demoLambda.role?.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('CloudWatchFullAccess'))

    // const cw_alarm = new cw.Alarm(this, 'demoLambda_alarm', {
    //   threshold: 1,
    //   metric: demoLambda.metricErrors(),
    //   evaluationPeriods: 1,
    // })
  }
}
