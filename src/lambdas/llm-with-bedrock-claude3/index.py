import boto3 
import json
import os
import logging
import uuid

logger = logging.getLogger()
logger.setLevel(logging.INFO)

textract_client = boto3.client('textract')
sqs_client = boto3.client('sqs')

FLENDER_2_CX_SNS_TOPIC_NAME = os.getenv('FLENDER_2_CX_SNS_TOPIC_NAME')

# do the stuffs here
