'use strict';
import * as AWSMock from 'aws-sdk-mock';
import { AWS } from '../api/aws';
import { handler } from './generate';
import { resolve } from 'path';

require('dotenv').config({ path: resolve(__dirname,"../test.env") });

describe('generate', () => {
  beforeAll(() => {
    AWSMock.setSDKInstance(AWS);
  });

  it('should throw an error if no guid is supplied', async () => {
    const result = await handler({
      body: JSON.stringify({})
    });
    
    expect(JSON.parse(result.body)).toMatchObject({
      error: expect.stringContaining("is required"),  
    });
  });

  it('should call S3 to create a signed PUT url to the correct bucket + key', async () => {
    const mockSigned = jest.fn((apiCallToSign: string, params: any, callback: Function) => {
      callback(null, 'someurl');
    });

    AWSMock.mock('S3', 'getSignedUrl', mockSigned);

    // Make sure our function completes
    AWSMock.mock('DynamoDB', 'putItem', () => Promise.resolve());
    
    await handler({
      body: JSON.stringify({
        guid: 'test-guid'
      }),
    });

    expect(mockSigned).toBeCalledWith(
      'putObject',
      expect.objectContaining({
        Bucket: process.env.UPLOAD_BUCKET,
        Key: expect.stringContaining('rdt-images/test-guid')
      }),
      expect.anything()
    );
    
    AWSMock.restore();
  });

  it('should create a new record in a dynamo DB table which includes the signed upload url', async () => {
    const mockUrl = "http://mockuploadurl.com";
    const mockGuid = 'test-guid';
    
    AWSMock.setSDKInstance(AWS);
    AWSMock.mock('S3', 'getSignedUrl', function (apiCallToSign: string, params: any, callback: Function) {
      callback(null, mockUrl);
    });
    
    const mockDynamoPut = jest.fn().mockResolvedValue(() => Promise.resolve());
    AWSMock.mock('DynamoDB', 'putItem', mockDynamoPut);

    await handler({
      body: JSON.stringify({
        guid: mockGuid
      }),
    });
    
    expect(mockDynamoPut).toBeCalledWith(
      expect.objectContaining({
        TableName: process.env.DYNAMO_TABLE,
        Item: expect.objectContaining({
          guid: {
            S: mockGuid,
          },
          uploadUrl: {
            S: mockUrl,
          },
        }),
      }),
      expect.anything()
    );

    AWSMock.restore();  
  });
});
