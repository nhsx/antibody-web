import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { putTestRecord } from '../../api/aws';
import { validateUpdateRequest, validateUpdateEnvironment } from '../../api/validate';
import { UpdateTestRequest }  from "abt-lib/requests/UpdateTest";
import config from '../config';
import TestRecord from 'abt-lib/models/TestRecord';

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {

  const guid = event.requestContext.authorizer?.principalId;

  if (!guid) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Missing user id"
      }),
      headers: config.defaultHeaders
    };
  }

  const parsedBody: UpdateTestRequest = JSON.parse(event.body as string);

  if (!parsedBody) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Missing event body"
      }),
      headers: config.defaultHeaders
    };
  }
  
  
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

  const DYNAMO_TABLE: string = process.env.DYNAMO_TABLE as string;

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

  const { testRecord }: {testRecord: TestRecord } = request;

  // Make sure we're always saving to the user's actual id, in case anyone tries to spoof the guid in their request.
  if (testRecord.guid !== guid) {
    throw new Error("Attempted to save with user_id that does not belong to this user");
  }

  await putTestRecord(DYNAMO_TABLE, testRecord);
  
  //Response
    
  return {
    statusCode: 200,
    body: JSON.stringify({ testRecord }),
    headers: config.defaultHeaders
  };
};  
