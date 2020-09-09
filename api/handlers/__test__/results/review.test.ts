import * as AWSMock from 'aws-sdk-mock';
import { AWS } from '../../../api/storage';
import { baseHandler as handler } from '../../results/review/handler';
import { GetQueueUrlResult, ReceiveMessageResult } from 'aws-sdk/clients/sqs';
import TestRecord from 'abt-lib/models/TestRecord';
import { ReviewResultRequest } from 'abt-lib/requests/ReviewResult';

describe('review', () => {

  const testGuid = 'test-guid';


  const reviewBody: ReviewResultRequest = {
    receiptHandle: 'test-receipt',
    reviewedResult: 'positive'
  };
  
  const defaultEvent: any =  { 
    pathParameters: {
      guid: testGuid
    },
    body: JSON.stringify(reviewBody),
    requestContext: {
      identity: {
        cognitoIdentityId: 'test-identity'
      }
    } 
  };

  const testHandle = 'test-receipt';
  const testQueueUrl = 'test-url';
  const testDownloadUrl = 'test-download-url';

  const testRecord : TestRecord = {
    guid: testGuid,
    uploadUrl: 'testUpload',
    downloadUrl: 'testDownload',
    step: 'testStep',
    testCompleted: true,
    result: 'positive',
    timerStartedAt: Date.now(),
  };
  
  const messageList : ReceiveMessageResult = {
    Messages: [
      {
        ReceiptHandle: testHandle,
        Body: testGuid
      }
    ]
  };
        
  const queueUrl : GetQueueUrlResult = {
    QueueUrl: testQueueUrl
  };

  const mockSigned = jest.fn((apiCallToSign: string, params: any, callback: Function) => {
    callback(null, testDownloadUrl);
  });

  const mockGet = jest.fn().mockResolvedValue({ Item: testRecord });

  const mockPut = jest.fn(() => Promise.resolve());

  const mockDeleteMsg = jest.fn(() => Promise.resolve());

  beforeAll(() => {
    AWSMock.setSDKInstance(AWS);
  });

  beforeEach(() => {
    jest.clearAllMocks();
    AWSMock.mock('S3', 'getSignedUrl', mockSigned);    
    AWSMock.mock('SQS', 'getQueueUrl', jest.fn().mockResolvedValue(queueUrl));
    AWSMock.mock('SQS', 'receiveMessage', jest.fn().mockResolvedValue(messageList));
    AWSMock.mock('DynamoDB.DocumentClient', 'get', mockGet);
    AWSMock.mock('DynamoDB.DocumentClient', 'put', mockPut);
    AWSMock.mock('SQS', 'deleteMessage', mockDeleteMsg);
  });

  afterEach(() => {
    AWSMock.restore();
  });


  it('should retrieve the test record from dynamo', async () => {
    const response = await handler(defaultEvent);
    console.log(response);
    expect(mockGet).toHaveBeenCalledWith({
      TableName: process.env.DYNAMO_TABLE,
      Key: {
        guid: testGuid
      }
    }, expect.anything());
  });

  it('should throw an error if an invalid result type is sent', async () => {
    const response = await handler({ 
      ...defaultEvent,
      body: JSON.stringify({
        ...reviewBody, 
        reviewedResult: "notreal" 
      })
    });
    expect(response.statusCode).toEqual(400);
    expect(JSON.parse(response.body).error).toMatch("must be one of");
  });

  it('should add the reviewers selection and their identity to the record and save it to Dynamo', async () => {
    await handler(defaultEvent);

    expect(mockPut).toHaveBeenCalledWith(
      {
        TableName: process.env.DYNAMO_TABLE,
        Item: expect.objectContaining({
          ...testRecord,
          review: expect.objectContaining(
            {
              reviewedResult: reviewBody.reviewedResult,
              reviewerId: 'test-identity',
              reviewedAt: expect.any(Number)
            }
          )
        })
      },       
      expect.anything()
    );
  });

  it('should delete the message from SQS using the supplied receipt', async () => {
    await handler(defaultEvent);

    expect(mockDeleteMsg).toHaveBeenCalledWith({
      QueueUrl: testQueueUrl,
      ReceiptHandle: reviewBody.receiptHandle
    }, expect.anything());
  });

  it('should return a 200 and the test record on successful completion', async () => {
    const response = await handler(defaultEvent);
    expect(response.statusCode).toEqual(200);
    expect(JSON.parse(response.body)).toMatchObject({
      ...testRecord,
      review: expect.objectContaining(
        {
          reviewedResult: reviewBody.reviewedResult,
          reviewerId: 'test-identity',
          reviewedAt: expect.any(Number)
        }
      )    
    });
  });
});