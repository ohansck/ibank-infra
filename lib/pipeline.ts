import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';

//Create the class
export class PipelineStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        //Define the pipeline
        const pipeline = new CodePipeline(this, 'Pipeline', {
            pipelineName: 'IBankPipeline',
            synth: new ShellStep('Synth', {
                input: CodePipelineSource.gitHub('ohansck/ibank-infra', 'main'),
                commands: ['npm ci', 'npm run build', 'npx cdk synth']
            })
        });
    }
}