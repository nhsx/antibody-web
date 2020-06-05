import * as AWSMock from 'aws-sdk-mock';
import { AWS } from '../../api/storage';
import { handler } from '../interpret/handler';
import { getAuthorisedEvent, mockPrincipalId } from './utils';
import nock from 'nock';
import config from '../../config';

const interpretEvent = getAuthorisedEvent({});

describe('interpret', () => {
  beforeAll(() => {
    AWSMock.setSDKInstance(AWS);
    AWSMock.mock('S3', 'getObject', Buffer.alloc(4, 'body'));
    AWSMock.mock("DynamoDB.DocumentClient", 'get', jest.fn(() => Promise.resolve({})));
    AWSMock.mock("DynamoDB.DocumentClient", 'put', jest.fn(() => Promise.resolve()));
  });

  beforeEach(() => {
    AWSMock.remock('S3', 'getObject', Buffer.alloc(4, 'body'));
    AWSMock.remock("DynamoDB.DocumentClient", 'get', jest.fn(() => Promise.resolve({})));
    AWSMock.remock("DynamoDB.DocumentClient", 'put', jest.fn(() => Promise.resolve()));
  });

  afterAll(() => {
    AWSMock.restore();
  });


  it('should stream the S3 output to the ML model URL', async () => {
    // Note - aws-sdk-mock supports mocking a buffer like this
    const buffer = Buffer.alloc(4, 'body');
    AWSMock.remock('S3', 'getObject', buffer);
    
    const mockInterpretResponse = {
      prediction: [{
        "Positive": 0.9351481199264526
      },
      {
        "Negative": 0.06485184282064438
      }]
    };  
    
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

  it('should return an error to the user if the model fails to interpret the image', async () => {
    const scope = nock(process.env.ML_API_BASE as string).post(`/${config.modelPath}`).reply(503);
    const response = await handler(interpretEvent);
    expect(scope.isDone()).toBeTruthy();
    expect(response.statusCode).toEqual(503);
  });


  it('should process the model output and save the prediction against the users record', async () => {
    const mockRecord = {
      Item: {
        test: 1
      }      
    };
    const getMock = jest.fn(() => Promise.resolve(mockRecord));
    const putMock = jest.fn(() => Promise.resolve());
    AWSMock.remock("DynamoDB.DocumentClient", 'get', getMock);
    AWSMock.remock("DynamoDB.DocumentClient", 'put', putMock);

    const mockInterpretResponse = [
      {
        "Positive": 0.9351481199264526
      },
      {
        "Negative": 0.06485184282064438
      }
    ];  
    
    const scope = nock(process.env.ML_API_BASE as string).post(`/${config.modelPath}`).reply(200, mockInterpretResponse);
    await handler(interpretEvent);

    expect(getMock).toHaveBeenCalledWith({
      TableName: process.env.DYNAMO_TABLE,
      Key: { guid: mockPrincipalId }
    }, 
    expect.anything()
    );

    expect(putMock).toHaveBeenCalledWith(expect.objectContaining({
      TableName: process.env.DYNAMO_TABLE,
      Item: expect.objectContaining({
        test: 1,
        result: "Positive",
        predictionData: mockInterpretResponse
      })
    }),
    expect.anything()
    );

    expect(scope.isDone()).toBeTruthy();
  });


  it('should return the updated record to the user', async () => {

    const mockInterpretResponse = [
      {
        "Positive": 0.9351481199264526
      },
      {
        "Negative": 0.06485184282064438
      }
    ];
    
    const interpretScope = nock(process.env.ML_API_BASE as string).post(`/${config.modelPath}`).reply(200, mockInterpretResponse);
    const response = await handler(interpretEvent);    

    expect(response.statusCode).toEqual(200);
    expect(JSON.parse(response.body).testRecord.predictionData[0].Positive).toEqual(mockInterpretResponse[0].Positive);
    expect(JSON.parse(response.body).testRecord.result).toEqual("Positive");
    interpretScope.done();
  });
});
