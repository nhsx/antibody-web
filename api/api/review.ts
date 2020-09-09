import TestRecord from "abt-lib/models/TestRecord";
import config from '../config';
import AWS from 'aws-sdk';

export const reviewIfRequired = async (testRecord : TestRecord) : Promise<Boolean> => {

  // Considering the quantity of images coming in we can just do this stochastically rather than incrementing a counter

  if (Math.random() < config.reviewChance) {
    await review(testRecord);
    return true;
  } else {
    return false;
  }
};

const review = async (testRecord: TestRecord) => {
  const sqs = new AWS.SQS();
  const queueUrl = await sqs.getQueueUrl({
    QueueName: process.env.REVIEW_QUEUE_NAME!
  }).promise();
    
  return await sqs.sendMessage({
    QueueUrl: queueUrl.QueueUrl!,
    MessageBody: testRecord.guid
  }).promise();
};

export interface NextResultResponse {
  receiptHandle: string,
  nextResultId: string
}

export const getNextResult = async () : Promise<NextResultResponse | null> => {
  const sqs = new AWS.SQS();

  const queueUrl = await sqs.getQueueUrl({
    QueueName: process.env.REVIEW_QUEUE_NAME!
  }).promise();

  const sqsResponse = await sqs.receiveMessage({
    QueueUrl: queueUrl.QueueUrl!
  }).promise();

  const messages = sqsResponse.Messages;

  if (messages?.[0]?.Body) {
    const message = messages[0];
    return {
      receiptHandle: message.ReceiptHandle as string,
      nextResultId: message.Body as string
    };
  } else {
    return null;
  }
};

// We seem to be missing type info for the DeleteMessageResponse type
export const deleteMessage = async(queueName: string, receiptHandle: string): Promise<any> => {
  const sqs = new AWS.SQS();

  const queueUrl = await sqs.getQueueUrl({
    QueueName: process.env.REVIEW_QUEUE_NAME!
  }).promise();

  return await sqs.deleteMessage({
    QueueUrl: queueUrl.QueueUrl!,
    ReceiptHandle: receiptHandle
  }).promise();
};