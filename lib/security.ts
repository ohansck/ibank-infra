import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

interface SecurityProps extends cdk.StackProps {
    vpc: ec2.Vpc
}


export class SecurityStack extends cdk.Stack {
    public readonly demoSg: ec2.SecurityGroup;
    constructor(scope: Construct, id: string, props: SecurityProps) {
        super(scope, id, props);

        // VPC and subnets
        this.demoSg = new ec2.SecurityGroup(this, 'demo-sg', {
            description: 'access to the ec2 instance',
            securityGroupName: 'ibank-sg',
            vpc: props.vpc,
            allowAllOutbound: true,
        })

        this.demoSg.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80), 'Allow http traffic');
        this.demoSg.applyRemovalPolicy(cdk.RemovalPolicy.DESTROY);

    }
}