import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';

//Create the class
export class IBankPipelineStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        //Define the pipeline
        const pipeline = new CodePipeline(this, 'Pipeline', {
            pipelineName: 'IBankPipeline',
            synth: new ShellStep('Synth', {
                input: CodePipelineSource.gitHub('michael-k-harris/cdk-pipeline-webinar', 'main'),
                commands: ['npm ci', 'npm run build', 'npm run cdk synth']
            })
        });
    }
}