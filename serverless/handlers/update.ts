import { APIGatewayProxyResult } from 'aws-lambda';
import { putTestRecord } from '../api/aws';
import { validateUpdateRequest, validateUpdateEnvironment } from '../api/validate';
import { UpdateTestRequest }  from "abt-lib/requests/UpdateTest";
import config from './config';
import TestRecord from 'abt-lib/models/TestRecord';

export const handler = async ({ body }: { body: any} ): Promise<APIGatewayProxyResult> => {


  const parsedBody: UpdateTestRequest = JSON.parse(body);

  if (!parsedBody) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Missing event body"
      }),
      headers: config.defaultHeaders
    };
  }

  const DYNAMO_TABLE: string = process.env.DYNAMO_TABLE as string;
  
  // Validation
  const { error: envError } = validateUpdateEnvironment(process.env);

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
  const { value: request, error: uploadError } = validateUpdateRequest(parsedBody);
  
  if (uploadError) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: uploadError.details?.[0]?.message || "Invalid request body" 
      }),
      headers: config.defaultHeaders
    };
  }

  const { testRecord } : {testRecord: TestRecord } = request;

  await putTestRecord(DYNAMO_TABLE, testRecord);
  
  //Response
    
  return {
    statusCode: 200,
    body: JSON.stringify({ testRecord }),
    headers: config.defaultHeaders
  };
};  
