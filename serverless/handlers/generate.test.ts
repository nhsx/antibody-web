'use strict';
import * as AWS from 'aws-sdk';
import * as AWSMock from 'aws-sdk-mock';
import path from 'path';
import * as mod from './generate';
import jestPlugin from 'serverless-jest-plugin';
import { handler } from './generate'
import { resolve } from 'path'


require('dotenv').config({path: resolve(__dirname,"../test.env")})

// make aws-sdk mockable everywhere
AWSMock.setSDK(path.resolve(__dirname, '..', 'node_modules', 'aws-sdk'));


describe('generate', () => {
  it('should throw an error if no guid is supplied', async () => {
    const result = await handler({
      body: JSON.stringify({})
    });
    
    expect(JSON.parse(result.body)).toMatchObject({
      error: expect.stringContaining("is required"),  
    });
  });

  it('should generate a signed url matching the users guid', async () => {
    // const mockSigned = jest.fn();
    // AWSMock.mock('S3', 'getSignedUrl', mockSigned);

    // wrapped
    //   .run({
    //     body: JSON.stringify({
    //       guid: 'test-guid'
    //     }),
    //   })
    //   .then(() => {
    //     expect(mockSigned).toBeCalledWith(
    //       expect.objectContaining({
    //         Bucket: process.env.UPLOAD_BUCKET,
    //         Key: expect.stringMatching('rdt-images/test-guid')
    //       }),
    //       expect.anything()
    //     );

    //     AWSMock.restore();
    //   });
  });

  it('should create a new record in a dynamo DB table which includes the signed upload url', async () => {
    // const mockUpload = jest.fn().mockResolvedValue({
    //   Location: 'testlocation',
    // });
    // const mockDynamoPut = jest.fn();

    // AWSMock.mock('S3', 'upload', mockUpload);
    // AWSMock.mock('DynamoDB', 'putItem', mockDynamoPut);

    // wrapped
    //   .run({
    //     body: JSON.stringify({
    //       rdt_image: 'R0lGODlhPQ==',
    //     }),
    //   })
    //   .then(() => {
    //     expect(mockDynamoPut).toBeCalledWith(
    //       expect.objectContaining({
    //         TableName: process.env.DYNAMO_TABLE,
    //         Item: expect.objectContaining({
    //           image_url: {
    //             S: null,
    //           },
    //         }),
    //       }),
    //       expect.anything()
    //     );

    //     AWSMock.restore();
    //   });
  });
});
