import * as AWSMock from 'aws-sdk-mock';
import { AWS } from '../../api/aws';
import { handler } from '../generate';
import { resolve } from 'path';
import { START_STEP } from 'abt-lib/dist/models/Steps';
import { getAuthorisedEvent, mockPrincipalId } from './utils';
import createEvent from '@serverless/event-mocks';

require('dotenv').config({ path: resolve(__dirname,"../../test.env") });

const generateEvent = getAuthorisedEvent({});

describe('generate', () => {
  beforeAll(() => {
    AWSMock.setSDKInstance(AWS);
  });

  it('should throw an error if no auth token is supplied', async () => {
    const result = await handler(createEvent("aws:apiGateway", {} as any));
    
    expect(JSON.parse(result.body)).toMatchObject({
      error: expect.stringContaining("Missing user id"),  
    });
  });

  it('should call S3 to create a signed PUT url to the correct bucket + key', async () => {
    const mockSigned = jest.fn((apiCallToSign: string, params: any, callback: Function) => {
      callback(null, 'someurl');
    });

    AWSMock.mock('DynamoDB.DocumentClient', 'get', jest.fn().mockResolvedValue(null));
    AWSMock.mock('S3', 'getSignedUrl', mockSigned);

    // Make sure our function completes
    AWSMock.mock('DynamoDB.DocumentClient', 'put', () => Promise.resolve());
    
    await handler(generateEvent);
    
    expect(mockSigned).toHaveBeenNthCalledWith(1, 
      'putObject',
      expect.objectContaining({
        Bucket: process.env.UPLOAD_BUCKET,
        Key: expect.stringContaining(`rdt-images/${mockPrincipalId}`)
      }),
      expect.anything()
    );
    expect(mockSigned).toHaveBeenNthCalledWith(2, 
      'getObject',
      expect.objectContaining({
        Bucket: process.env.UPLOAD_BUCKET,
        Key: expect.stringContaining(`rdt-images/${mockPrincipalId}`)
      }),
      expect.anything()
    );
    
    AWSMock.restore();
  });

  it('should return an existing record', async () => {
    const mockSigned = jest.fn((apiCallToSign: string, params: any, callback: Function) => {
      callback(null, 'someurl');
    });

    const mockGet = jest.fn().mockResolvedValue({
      Item: true
    });

    AWSMock.mock('S3', 'getSignedUrl', mockSigned);

    // Make sure our function completes
    AWSMock.mock('DynamoDB.DocumentClient', 'get', mockGet);
    
    const response = await handler(generateEvent);

    expect(mockGet).toBeCalledWith(
      expect.objectContaining({
        TableName: process.env.DYNAMO_TABLE,
        Key: { guid: mockPrincipalId }
      }),
      expect.anything()
    );

    expect(JSON.parse(response.body)).toMatchObject({
      testRecord: true
    });
    
    AWSMock.restore();
  });

  

  it('should create a new record in a dynamo DB table if no record is found', async () => {
    const mockUrl = "http://mockuploadurl.com";
    
    AWSMock.setSDKInstance(AWS);
    AWSMock.mock('S3', 'getSignedUrl', function (apiCallToSign: string, params: any, callback: Function) {
      callback(null, mockUrl);
    });
    
    const mockDynamoPut = jest.fn().mockResolvedValue(() => Promise.resolve());
    AWSMock.mock('DynamoDB.DocumentClient', 'get', jest.fn().mockResolvedValue(null));
    AWSMock.mock('DynamoDB.DocumentClient', 'put', mockDynamoPut);

    await handler(generateEvent);
    
    expect(mockDynamoPut).toBeCalledWith(
      expect.objectContaining({
        TableName: process.env.DYNAMO_TABLE,
        Item: expect.objectContaining({
          guid: mockPrincipalId,
          uploadUrl: mockUrl,
          downloadUrl: mockUrl,
          step: START_STEP
        }) 
      }),
      expect.anything()
    );

    AWSMock.restore();  
  });
});
