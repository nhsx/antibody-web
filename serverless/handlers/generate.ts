import { APIGatewayProxyResult } from 'aws-lambda';
import { getUrls, createTestRecord } from '../api/aws';
import { validateGenerateRequest, validateEnvironment } from '../api/validate';
import { GenerateTestRequest }  from "abt-lib/requests/GenerateTest";
import config from './config';
import TestRecord from 'abt-lib/models/TestRecord';

export const handler = async ({ body }: { body: any} ): Promise<APIGatewayProxyResult> => {

  const parsedBody: GenerateTestRequest = JSON.parse(body);

  if (!parsedBody) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Missing event body"
      }),
      headers: config.defaultHeaders
    };
  }

  const UPLOAD_BUCKET: string = process.env.UPLOAD_BUCKET as string;
  const DYNAMO_TABLE: string = process.env.DYNAMO_TABLE as string;
  
  // Validation
  const { error: envError } = validateEnvironment(process.env);

  if (envError) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Environment configuration error"
      }),
      headers: config.defaultHeaders
    };
  }

  //Pull out our variables from the event body, once validated
  const { value: request, error: uploadError } = validateGenerateRequest(parsedBody);
  
  if (uploadError) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: uploadError.details?.[0]?.message || "Invalid request body" 
      }),
      headers: config.defaultHeaders
    };
  }

  //Handler body
  const { guid } = request; 

  // Check if this user already has a test in progress
  

  const { uploadUrl, downloadUrl } = await getUrls(UPLOAD_BUCKET, guid);
  const record: TestRecord = {
    guid,
    uploadUrl,
    downloadUrl,
    step: "checkYourKit"
  };

  await createTestRecord(DYNAMO_TABLE, record);
  
  //Response
    
  return {
    statusCode: 200,
    body: JSON.stringify(record),
    headers: config.defaultHeaders
  };
};  
