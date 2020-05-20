import { APIGatewayProxyResult } from 'aws-lambda';
import { getUploadUrl, createTestRecord } from '../api/api';
import { validateGenerateRequest, validateEnvironment } from '../api/validate';
import { GenerateTestRequest, GenerateTestResponse}  from "abt-lib/requests/GenerateTest";

export const handler = async ({ body }: { body: any} ): Promise<APIGatewayProxyResult> => {

  const parsedBody: GenerateTestRequest = JSON.parse(body);

  if (!parsedBody) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Missing event body"
      })
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
      })
    };
  }

  //Pull out our variables from the event body, once validated
  const { value: request, error: uploadError } = validateGenerateRequest(parsedBody);
  
  if (uploadError) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: uploadError.details?.[0]?.message || "Invalid request body" 
      })
    };
  }

  //Handler body
  const { guid } = request; 
  console.log('getting upload url');
  const uploadUrl = await getUploadUrl(UPLOAD_BUCKET, guid);
  console.log(uploadUrl);

  const testRecord = await createTestRecord(DYNAMO_TABLE, {
    guid,
    uploadUrl
  });
  
  //Response
  const response: GenerateTestResponse = {
    guid: body.guid,
    uploadUrl: uploadUrl,
    testRecord
  };
    
  return {
    statusCode: 200,
    body: JSON.stringify({
      response
    })
  };
};  
