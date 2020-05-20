'use strict';
import * as AWS from 'aws-sdk';
import * as AWSMock from 'aws-sdk-mock';
import path from 'path';
import { handler } from './upload';
import jestPlugin from 'serverless-jest-plugin';
import { APIGatewayProxyResult, Handler } from 'aws-lambda';
import { resolve } from 'path';

require('dotenv').config({path: resolve(__dirname,"../test.env")});

// make aws-sdk mockable everywhere
AWSMock.setSDK(path.resolve(__dirname, '..', 'node_modules', 'aws-sdk'));

describe('upload', () => {
  it('should throw an error if no body.rdt_image is supplied ', async () => {
    const result: APIGatewayProxyResult = await handler({});

    const body = JSON.parse(result.body);

    expect(body).toMatchObject({
      error: expect.stringMatching('Failed to decode'),
    });
  });

  it('should upload to the bucket provided in the env vars', async () => {
    const mockUpload = jest.fn();
    AWSMock.mock('S3', 'upload', mockUpload);
    AWSMock.mock('DynamoDB', 'putItem', jest.fn());

    await handler({
      body: JSON.stringify({
        rdt_image: 'R0lGODlhPQ==',
      }),
    });
        
    expect(mockUpload).toBeCalledWith(
      expect.objectContaining({
        Bucket: process.env.UPLOAD_BUCKET,
        Key: 'tttp',
        Body: expect.any(Buffer),
      }),
      expect.anything()
    );

    AWSMock.restore();
      
  });

  it('should upload the s3 key to a new record in a dynamo DB table given in env vars', async () => {
    const mockUpload = jest.fn().mockResolvedValue({
      Location: 'testlocation',
    });
    const mockDynamoPut = jest.fn();

    AWSMock.mock('S3', 'upload', mockUpload);
    AWSMock.mock('DynamoDB', 'putItem', mockDynamoPut);

    handler({
      body: JSON.stringify({
        rdt_image: 'R0lGODlhPQ==',
      }),
    })
      .then(() => {
        expect(mockDynamoPut).toBeCalledWith(
          expect.objectContaining({
            TableName: process.env.DYNAMO_TABLE,
            Item: expect.objectContaining({
              image_url: {
                S: 'testlocation234',
              },
            }),
          }),
          expect.anything()
        );

        AWSMock.restore();
      });
  });
});