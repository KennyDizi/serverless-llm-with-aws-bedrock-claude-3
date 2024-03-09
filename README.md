# Serverless LLM with AWS Bedrock Claude-3

A serverless application that utilizes AWS Bedrock Claude-3 for natural language processing tasks. This application is built using AWS CDK and is designed to be deployed across multiple regions and environments.

## Features

- Utilizes AWS Lambda and Bedrock Claude-3 for processing natural language inputs.
- Supports multi-region deployment through AWS CDK.
- Includes typescript and python lambda function examples.
- Environment variables for flexible configuration.

## Requirements

- AWS CLI
- Node.js and npm
- AWS CDK
- Python 3.11 or higher

## Setup

1. Clone the repository:

```bash
git clone https://github.com/KennyDizi/serverless-llm-with-aws-bedrock-claude-3
```

2. Install dependencies:

```bash
npm install
```

3. Set up your environment variables in a `.env` file based on the `.env.example` template.

4. Build the typescript files:

```bash
npm run build
```

## Deployment

Deploy the application to your default AWS account/region:

```bash
npx cdk deploy
```

## Check model avaibility on your region via

<https://docs.aws.amazon.com/bedrock/latest/userguide/models-regions.html>
