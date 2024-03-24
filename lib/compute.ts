import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { readFileSync } from 'fs';

interface Ec2Props extends cdk.StackProps {
    vpc: ec2.Vpc;
    sg: ec2.SecurityGroup;
}

export class ComputeStack extends cdk.Stack {
    public readonly ec2: ec2.Instance;
    constructor(scope: Construct, id: string, props: Ec2Props) {
        super(scope, id, props);

        this.ec2 = new ec2.Instance(this, 'ec2', {
            vpc: props.vpc,
            vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
            securityGroup: props.sg,
            machineImage: ec2.MachineImage.latestAmazonLinux2023(),
            instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
        })

        const userData = readFileSync('./lib/userdata.sh', 'utf8')
        this.ec2.addUserData(userData);

    }
}