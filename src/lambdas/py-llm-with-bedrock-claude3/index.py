import boto3
import json
import os
import logging
import uuid

logger = logging.getLogger()
logger.setLevel(logging.INFO)

bedrock = boto3.client('bedrock')

CLAUDE_3_MODEL_NAME = os.getenv('CLAUDE_3_MODEL_NAME')
AWS_LWA_INVOKE_MODE = os.getenv('AWS_LWA_INVOKE_MODE')

def handler(event, _):
   logger.info('Event: %s', event)
   # extract topic from event body and call bedrock_stream
   topic = event['topic']
   return bedrock_stream(topic)

async def bedrock_stream(topic: str):
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
    response = bedrock.invoke_model_with_response_stream(
        modelId=CLAUDE_3_MODEL_NAME,
        body=body
    )

    stream = response.get('body')
    if stream:
        for event in stream:
            chunk = event.get('chunk')
            if chunk:
                yield json.loads(chunk.get('bytes').decode())['completion']