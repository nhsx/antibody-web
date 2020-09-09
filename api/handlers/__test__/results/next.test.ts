import * as AWSMock from 'aws-sdk-mock';
import { AWS } from '../../../api/storage';
import { baseHandler as handler } from '../../results/next/handler';
import config from '../../../config';
import { GetQueueUrlResult, ReceiveMessageResult } from 'aws-sdk/clients/sqs';

describe('generate', () => {

  const defaultEvent: any =  { requestContext: {} };
  const testGuid = 'test-guid';
  const testQueueUrl = 'test-url';
  const testHandle = 'test-handle';
  const testDownloadUrl = 'test-download-url';
  const messageList : ReceiveMessageResult = {
    Messages: [
      {
        Body: testGuid,
        ReceiptHandle: testHandle,
      }
    ]
  };
        
  const queueUrl : GetQueueUrlResult = {
    QueueUrl: testQueueUrl
  };
  const mockSigned = jest.fn((apiCallToSign: string, params: any, callback: Function) => {
    callback(null, testDownloadUrl);
  });

  beforeAll(() => {
    AWSMock.setSDKInstance(AWS);
  });

  beforeEach(() => {
    AWSMock.mock('S3', 'getSignedUrl', mockSigned);    
    AWSMock.mock('SQS', 'getQueueUrl', jest.fn().mockResolvedValue(queueUrl));
    AWSMock.mock('SQS', 'receiveMessage', jest.fn().mockResolvedValue(messageList));
  });

  afterEach(() => {
    AWSMock.restore();
  });

  it('should return a 204 if no messages are found in the queue', async () => {
    AWSMock.remock("SQS", "receiveMessage", jest.fn().mockResolvedValue({ Messages: [] }));
    const response = await handler(defaultEvent);
    expect(response.statusCode).toEqual(204);
  });

  it('should request messages from the queue url determined by the queue name', async () => {
    const receiveMessageSpy = jest.fn().mockResolvedValue(messageList);
    AWSMock.remock('SQS', 'receiveMessage', receiveMessageSpy);
      
    await handler(defaultEvent);

    expect(receiveMessageSpy).toHaveBeenCalledWith(expect.objectContaining({
      QueueUrl: 'test-url'
    }), expect.anything());
  });
  
  it('should retrieve an id from the queue and pass it to our url generation', async () => {
    const newMockSigned = jest.fn((apiCallToSign: string, params: any, callback: Function) => {
      callback(null, testDownloadUrl);
    });
    AWSMock.remock('S3', 'getSignedUrl', newMockSigned);

    await handler(defaultEvent);

    expect(mockSigned).toHaveBeenCalledWith(
      'getObject',
      expect.objectContaining({
        Bucket: process.env.UPLOAD_BUCKET,
        Key: config.rdtImagePath + testGuid
      }),
      expect.anything()
    );
  });

  it('should return the generated url and queue message ID as a successful response', async () => {
    const response = await handler(defaultEvent);
    expect(response.statusCode).toEqual(200);
    expect(JSON.parse(response.body)).toMatchObject({
      url: testDownloadUrl,
      receiptHandle: testHandle,
      guid: testGuid
    });
  });
});
