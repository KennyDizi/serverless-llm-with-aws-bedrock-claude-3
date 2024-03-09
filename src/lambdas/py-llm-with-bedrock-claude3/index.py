import boto3
import json
import os
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)

bedrock = boto3.client(service_name='bedrock-runtime')

CLAUDE_3_MODEL_NAME = os.getenv('CLAUDE_3_MODEL_NAME')
AWS_LWA_INVOKE_MODE = os.getenv('AWS_LWA_INVOKE_MODE')

def handler(event, _):
    """
    Handles the Lambda function invocation.

    Args:
        event (dict): The event data passed to the Lambda function.
        _ (object): The context object passed to the Lambda function.

    Returns:
        dict: The response object containing the status code and body.

    Raises:
        None
    """
    logger.info("event: %s", event)
    print(f"CLAUDE_3_MODEL_NAME: {CLAUDE_3_MODEL_NAME}")
    print(f"AWS_LWA_INVOKE_MODE: {AWS_LWA_INVOKE_MODE}")
    try:
        # get the topic from the event
        event_body = json.loads(event['body'])
        print(f"body: {event_body}")
        # extract the topic from the body
        topic = event_body['topic']
        if not topic:
            return {
                'statusCode': 400,
                'body': json.dumps({
                    'error': 'missing topic'
                })
            }
        instruction = f"""
        You are a world class writer. Please write a sweet bedtime story about {topic}.
        """
        body = json.dumps({
            'prompt': f'Human:{instruction}\n\nAssistant:',
            'max_tokens_to_sample': 1028,
            'temperature': 1,
            'top_k': 250,
            'top_p': 0.999,
            'stop_sequences': ['\n\nHuman:']
        })
        print(f"CLAUDE_3_MODEL_NAME: {CLAUDE_3_MODEL_NAME}")
        response = bedrock.invoke_model(
            modelId=CLAUDE_3_MODEL_NAME,
            body=body
        )
        response_body = json.loads(response.get('body').read())

        output_text = response_body.get('results')[0].get('outputText')
        return {
            'statusCode': 200,
            'body': output_text
        }
    except Exception as e:
        logger.error("Error: %s", e)
        return {
            'statusCode': 500,
            'body': json.dumps({
                'error': str(e)
            })
        }
