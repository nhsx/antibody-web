import * as AWSMock from 'aws-sdk-mock';
import { AWS } from '../../../api/storage';
import { baseHandler as handler } from '../../results/next/handler';
import { GetQueueUrlResult, ReceiveMessageResult } from 'aws-sdk/clients/sqs';

describe('review', () => {

  const testGuid = 'test-guid';
  const testId = 'test-id';
  const testQueueUrl = 'test-url';
  const testDownloadUrl = 'test-download-url';
  const messageList : ReceiveMessageResult = {
    Messages: [
      {
        MessageId: testId,
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

  it('should retrieve the message from the queue', async () => {

  });

  it('should return the generated url as a successful response', async () => {
    const response = await handler({ requestContext: {} } as any);
    expect(response.statusCode).toEqual(200);
    expect(JSON.parse(response.body)).toMatchObject({
      url: testDownloadUrl
    });
  });
});
