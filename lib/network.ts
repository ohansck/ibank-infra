import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';



export class NetworkStack extends cdk.Stack {
    public readonly vpc: ec2.Vpc;
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // VPC and subnets
        this.vpc = new ec2.Vpc(this, 'demoVpc', {
            vpcName: 'ibank-vpc',
            ipAddresses: ec2.IpAddresses.cidr('10.0.0.0/16'),
            natGateways: 0,
        })
    }
}