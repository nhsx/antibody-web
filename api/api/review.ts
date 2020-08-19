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
  const SQS = new AWS.SQS();
  const queueUrl = await SQS.getQueueUrl({
    QueueName: process.env.REVIEW_QUEUE_NAME!
  }).promise();
    
  return await SQS.sendMessage({
    QueueUrl: queueUrl.QueueUrl!,
    MessageBody: testRecord.guid
  }).promise();
};

export const getNextResultId = async () : Promise<string | null> => {
  const SQS = new AWS.SQS();

  const queueUrl = await SQS.getQueueUrl({
    QueueName: process.env.REVIEW_QUEUE_NAME!
  }).promise();

  const sqsResponse = await SQS.receiveMessage({
    QueueUrl: queueUrl.QueueUrl!
  }).promise();

  const messages = sqsResponse.Messages;

  return messages?.length ? messages[0].Body! : null;
};
