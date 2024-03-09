import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ServerlessLlmWithAwsBedrockClaude3StackProps } from './ServerlessLlmWithAwsBedrockClaude3StackProps';

export class ServerlessLlmWithAwsBedrockClaude3Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: ServerlessLlmWithAwsBedrockClaude3StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'ServerlessLlmWithAwsBedrockClaude3Queue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
