import path from 'path';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { PythonFunction } from "@aws-cdk/aws-lambda-python-alpha";
import { ServerlessLlmWithAwsBedrockClaude3StackProps } from './ServerlessLlmWithAwsBedrockClaude3StackProps';

export class ServerlessLlmWithAwsBedrockClaude3Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: ServerlessLlmWithAwsBedrockClaude3StackProps) {
    super(scope, id, props);

    const llmWithBedrockClaude3PythonFn = new PythonFunction(this, `${props.resourcePrefix}-${props.deployRegion}-llmWithBedrockClaude3PythonFn`, {
      functionName: `${props.resourcePrefix}-${props.deployRegion}-llmWithBedrockClaude3PythonFn`,
      runtime: cdk.aws_lambda.Runtime.PYTHON_3_11,
      entry: path.join(__dirname, '../src/lambdas/py-llm-with-bedrock-claude3'),
      handler: "handler",
      architecture: lambda.Architecture.ARM_64,
      runtimeManagementMode: lambda.RuntimeManagementMode.AUTO,
      memorySize: 1024,
      timeout: cdk.Duration.seconds(60), // 60 seconds
      logGroup: new cdk.aws_logs.LogGroup(this, `${props.resourcePrefix}-${props.deployRegion}-llmWithBedrockClaude3PythonFn-LogGroup`, {
          logGroupName: `${props.resourcePrefix}-${props.deployRegion}-llmWithBedrockClaude3PythonFn-LogGroup`,
          removalPolicy: cdk.RemovalPolicy.DESTROY,
          retention: cdk.aws_logs.RetentionDays.ONE_WEEK,
      }),
      environment: {
        CLAUDE_3_MODEL_NAME: props.claude3ModelName,
        AWS_LWA_INVOKE_MODE: 'RESPONSE_STREAM',
      },
      role: new cdk.aws_iam.Role(this, `${props.resourcePrefix}-${props.deployRegion}-llmWithBedrockClaude3PythonFn-Role`, {
          assumedBy: new cdk.aws_iam.ServicePrincipal('lambda.amazonaws.com'),
          managedPolicies: [
              cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
          ],
          inlinePolicies: {
              // define a policy document named bedrockPolicy to allow the lambda functio to call the bedrock API
              bedrockPolicy: new cdk.aws_iam.PolicyDocument({
                  statements: [
                      new cdk.aws_iam.PolicyStatement({
                          actions: ['bedrock:Invoke', 'bedrock:InvokeModelWithResponseStream'],
                          resources: ['*'],
                      }),
                  ],
              }),
          },
      }),
    });

    // Configure Lambda Function URL
    const llmWithBedrockClaude3PythonFnUrl = new cdk.aws_lambda.FunctionUrl(this, `${props.resourcePrefix}-${props.deployRegion}-llmWithBedrockClaude3PythonFn-Url`, {
      function: llmWithBedrockClaude3PythonFn,
      invokeMode: cdk.aws_lambda.InvokeMode.RESPONSE_STREAM,
      authType: cdk.aws_lambda.FunctionUrlAuthType.NONE, // or AWS_IAM, based on your security requirements
    });

    // export the URL of the Lambda Function
    new cdk.CfnOutput(this, `${props.resourcePrefix}-${props.deployRegion}-llmWithBedrockClaude3PythonFn-Url`, {
      value: llmWithBedrockClaude3PythonFnUrl.url,
      description: `The URL of the Lambda Function.`,
    });
  }
}
