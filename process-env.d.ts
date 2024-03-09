declare module NodeJS {
    interface ProcessEnv {
        [key: string]: string | undefined;
        /**
         * The regions where the CDK application will be deployed.
         */
        CDK_DEPLOY_REGIONS: string;
        /**
         * A comma-separated list of environments for the application, e.g., "dev,prod".
         */
        ENVIRONMENTS: string;
        CLAUDE_3_MODEL_NAME: string;
    }
}
