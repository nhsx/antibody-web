// import * as AWSMock from 'aws-sdk-mock';
// import { AWS } from '../../api/aws';
// import { handler } from 'handlers/interpret/handler';
// import { resolve } from 'path';
// import { getAuthorisedEvent, mockPrincipalId } from './utils';


// require('dotenv').config({ path: resolve(__dirname,"../../test.env") });

// const interpretEvent = getAuthorisedEvent({});

// describe('generate', () => {
//   beforeAll(() => {
//     AWSMock.setSDKInstance(AWS);
//   });

//   it('should download the users image from S3', async () => {
//     const mockDownload = new Blob();
//     const mockGet = jest.fn().mockResolvedValue(mockDownload);
//     AWSMock.mock("S3", "getObject", mockGet);

//     await handler(interpretEvent);

//     expect(mockGet).toHaveBeenCalledWith(expect.objectContaining({
//       Key: mockPrincipalId
//     }));
//   });

//   it('should send the image via HTTP to the address specified in the env', async () => {
    
//   });

//   it('should return an error to the user if they have not uploaded an image', async () => {

//   });

//   it('should return the model output to the user', async () => {
    
//   });
// });
