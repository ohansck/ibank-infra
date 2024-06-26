#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { InfraStack } from '../lib/infra-stack';
import { NetworkStack } from '../lib/network';
import { SecurityStack } from '../lib/security';
import { ComputeStack } from '../lib/compute';
import { PipelineStack } from '../lib/pipeline';

const app = new cdk.App();

// const netStack = new NetworkStack(app, 'IBankVpcStack', {

// })

// const sg = new SecurityStack(app, 'IBankSecurityStack', {

//   vpc: netStack.vpc
// })

new PipelineStack(app, 'IBankPipelineStack', {});
// new ComputeStack(app, 'IBankComputeStack', {

//   vpc: netStack.vpc,
//   sg: sg.demoSg
// })

// new InfraStack(app, 'IBankStack', {
//   /* Uncomment the next line to specialize this stack for the AWS Account
//    * and Region that are implied by the current CLI configuration. */
//   // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

//   /* Uncomment the next line if you know exactly what Account and Region you
//    * want to deploy the stack to. */
//   // env: { account: '123456789012', region: 'us-east-1' },

//   /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
// });