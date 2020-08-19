import * as AWSMock from 'aws-sdk-mock';
import { baseHandler as handler } from '../interpret/handler';
import { getAuthorisedEvent } from './utils';
import nock from 'nock';
import config from '../../config';

const interpretEvent = getAuthorisedEvent({});

let mockInterpretResponse = [
  {
    success: true,
    result: 'positive',
    confidence: {
      positive: 0.9,
      negative: 0.1
    },
    quality: {
      blur: 'ok',
      exposure: 'ok'
    },
    extracts: {
      rdt: 'test',
      diagnostic: [[1, 2], [3, 4]]
    }
  }
];  
describe('interpret', () => {

  beforeEach(() => {
    AWSMock.mock('S3', 'getObject', Buffer.alloc(4, 'body'));
    AWSMock.mock("DynamoDB.DocumentClient", 'get', jest.fn(() => Promise.resolve({})));
    AWSMock.mock("DynamoDB.DocumentClient", 'put', jest.fn(() => Promise.resolve()));
  });

  afterEach(() => {
    AWSMock.restore();
  });


  it('should stream the S3 output to the ML model URL', async () => {
    // Note - aws-sdk-mock supports mocking a buffer like this
    const buffer = Buffer.alloc(4, 'body');
    AWSMock.remock('S3', 'getObject', buffer);
  
    
    // Check the body content received is the same as is sent
    const scope = nock(process.env.ML_API_BASE as string).post(`/${config.modelPath}`, buffer).reply(200, mockInterpretResponse);
    await handler(interpretEvent);

    expect(scope.isDone()).toBeTruthy();
  });


  it('should return an error to the user if the fetch from S3 fails', async () => {
    AWSMock.remock('S3', 'getObject', () => { throw new Error();});
    
    const response = await handler(interpretEvent);

    expect(response.statusCode).toEqual(404);
  });

  // it('should send a test record to the queue if our random number is below the supplied threshold', async () => {
  //     const mockMath = Object.create(global.Math);
  //     mockMath.random = () => 0.005;
  //     global.Math = mockMath;


  //   })
  // });

  // it('should send a test record to the queue if our random number is above the supplied threshold', async () => {
  //   const mockMath = Object.create(global.Math);
  //   mockMath.random = () => 0.5;
  //   global.Math = mockMath;
  // });

  // it('should return an error to the user if the model fails to interpret the image', async () => {
  //   const scope = nock(process.env.ML_API_BASE as string).post(`/${config.modelPath}`).reply(503);
  //   const response = await handler(interpretEvent);
  //   expect(scope.isDone()).toBeTruthy();
  //   expect(response.statusCode).toEqual(503);
  // });


  // it('should process the model output and save the prediction against the users record', async () => {
  //   const mockRecord = {
  //     Item: {
  //       test: 1
  //     }      
  //   };
  //   const getMock = jest.fn(() => Promise.resolve(mockRecord));
  //   const putMock = jest.fn(() => Promise.resolve());
  //   AWSMock.remock("DynamoDB.DocumentClient", 'get', getMock);
  //   AWSMock.remock("DynamoDB.DocumentClient", 'put', putMock);

  //   const scope = nock(process.env.ML_API_BASE as string).post(`/${config.modelPath}`).reply(200, mockInterpretResponse);
  //   await handler(interpretEvent);

  //   expect(getMock).toHaveBeenCalledWith({
  //     TableName: process.env.DYNAMO_TABLE,
  //     Key: { guid: mockPrincipalId }
  //   }, 
  //   expect.anything()
  //   );

  //   expect(putMock).toHaveBeenCalledWith(expect.objectContaining({
  //     TableName: process.env.DYNAMO_TABLE,
  //     Item: expect.objectContaining({
  //       test: 1,
  //       result: "positive",
  //       predictionData: mockInterpretResponse
  //     })
  //   }),
  //   expect.anything()
  //   );

  //   expect(scope.isDone()).toBeTruthy();
  // });


  // it('should return the updated record to the user', async () => {

    
  //   const interpretScope = nock(process.env.ML_API_BASE as string).post(`/${config.modelPath}`).reply(200, mockInterpretResponse);
  //   const response = await handler(interpretEvent);    

  //   expect(response.statusCode).toEqual(200);
  //   expect(JSON.parse(response.body).testRecord.predictionData.result).toEqual("positive");
  //   expect(JSON.parse(response.body).testRecord.result).toEqual("positive");
  //   interpretScope.done();
  // });
});
