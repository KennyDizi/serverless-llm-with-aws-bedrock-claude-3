#!/usr/bin/env node
import 'source-map-support/register';

import * as cdk from 'aws-cdk-lib';
import * as dotenv from 'dotenv';
import { checkEnvVariables } from '../utils/check-environment-variable';
import { ServerlessLlmWithAwsBedrockClaude3Stack } from '../lib/serverless-llm-with-aws-bedrock-claude-3-stack';

dotenv.config(); // Load environment variables from .env file
const app = new cdk.App();

const { CDK_DEFAULT_ACCOUNT: account, CDK_DEFAULT_REGION: region } = process.env;

const cdkRegions = process.env.CDK_DEPLOY_REGIONS?.split(',') ?? [region]; // Parsing comma separated list of regions
const deployEnvironments = process.env.ENVIRONMENTS?.split(',') ?? ['development']; // Parsing comma separated list of environments

// check APP_NAME variable
checkEnvVariables('APP_NAME', 'CLAUDE_3_MODEL_NAME');
const appName = process.env.APP_NAME!;

for (const deployEnvironment of deployEnvironments) {
    for (const cdkRegion of cdkRegions) {
        const stackProps = {
            resourcePrefix: `${appName}-${deployEnvironment}`,
            env: {
                region: cdkRegion,
                account,
            },
            deployRegion: cdkRegion,
            deployEnvironment,
            appName,
            claude3ModelName: process.env.CLAUDE_3_MODEL_NAME!,
        };
        new ServerlessLlmWithAwsBedrockClaude3Stack(app, `ServerlessLlmWithAwsBedrockClaude3Stack`, {
            ...stackProps,
            stackName: `${appName}-${deployEnvironment}-ServerlessLlmWithAwsBedrockClaude3Stack`,
            description: `ServerlessLlmWithAwsBedrockClaude3Stack for ${appName} in ${cdkRegion} ${deployEnvironment}.`,
        });
    }
}

app.synth();
