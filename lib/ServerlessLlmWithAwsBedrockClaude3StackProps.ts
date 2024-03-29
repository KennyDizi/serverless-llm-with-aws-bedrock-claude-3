import { StackProps } from "aws-cdk-lib";
/**
 * The properties for the ServerlessLlmWithAwsBedrockClaude3Stack.
 */
export interface ServerlessLlmWithAwsBedrockClaude3StackProps extends StackProps {
    /**
     * The name of the model.
     */
    readonly claude3ModelName: string;
    /**
     * The name of the application.
     */
    readonly appName: string;
    /**
     * The region where the application will be deployed.
     */
    readonly deployRegion: string | undefined;
    /**
     * The environment for the application, e.g., "dev".
     */
    readonly deployEnvironment: string;
    /**
     * The prefix for the resources.
     */
    readonly resourcePrefix: string;
}
