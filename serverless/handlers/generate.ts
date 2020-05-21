import { APIGatewayProxyResult } from 'aws-lambda';
import { getUploadUrl, createTestRecord } from '../api/aws';
import { validateGenerateRequest, validateEnvironment } from '../api/validate';
import { GenerateTestRequest, GenerateTestResponse }  from "abt-lib/requests/GenerateTest";
import config from './config';

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
  const uploadUrl = await getUploadUrl(UPLOAD_BUCKET, guid);
  const testRecord = await createTestRecord(DYNAMO_TABLE, {
    guid,
    uploadUrl
  });
  
  //Response
  const response: GenerateTestResponse = {
    guid: body.guid,
    uploadUrl: uploadUrl,
    testRecord,
  };
    
  return {
    statusCode: 200,
    body: JSON.stringify(response),
    headers: config.defaultHeaders
  };
};  
