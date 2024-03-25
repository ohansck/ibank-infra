import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { InfraStack } from './infra-stack';

export class PipelineStage extends cdk.Stage {
    constructor(scope: Construct, id: string, props?: cdk.StageProps) {
        super(scope, id, props);

        new InfraStack(this, 'InfraStack');
    }
}