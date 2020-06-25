import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { putTestRecord, getTestRecord } from '../../api/storage';
import { validateUpdateRequest, validateUpdateEnvironment } from '../../api/validate';
import { UpdateTestRequest }  from "abt-lib/requests/UpdateTest";
import config from '../../config';
import TestRecord from 'abt-lib/models/TestRecord';
import withSentry from 'serverless-sentry-lib';
import logger from '../../utils/logger';
import { scheduleNotification } from '../../api/notifier';

export const baseHandler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {

  const guid = event.requestContext.authorizer?.principalId;

  logger.info("Updating test record for user with guid:", guid);

  if (!guid) {
    logger.error("No guid available in request context");
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
    logger.error("Could not parse update body", event.body);
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Missing event body"
      }),
      headers: config.defaultHeaders
    };
  }
  
  const { error: envError } = validateUpdateEnvironment(process.env);
  
  if (envError) {
    logger.error("Environment not configured correctly", envError);
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
    logger.error("Request failed validation", parsedBody, uploadError);
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: uploadError.details?.[0]?.message || "Invalid request body" 
      }),
      headers: config.defaultHeaders
    };
  }

  const { testRecord }: {testRecord: TestRecord } = request;

  logger.info("Updating record...");
  // Make sure we're always saving to the user's actual id, in case anyone tries to spoof the guid in their request.
  if (testRecord.guid !== guid) {
    logger.error("WARNING: Attempted to save record to another user's guid");
    throw new Error("Attempted to save with user_id that does not belong to this user");
  }

  const oldRecord = await getTestRecord(DYNAMO_TABLE, guid);

  // Only schedule our notification if we are receiving the user's subscription for the first time
  if (!oldRecord?.notificationSubscription && testRecord.notificationSubscription) {
    scheduleNotification({
      subscription: testRecord.notificationSubscription
    }, {
      wait: 10
    });
  }
  
  await putTestRecord(DYNAMO_TABLE, testRecord);
  
  //Response
  logger.debug(testRecord);
  logger.info("Updating record complete");

  return {
    statusCode: 200,
    body: JSON.stringify({ testRecord }),
    headers: config.defaultHeaders
  };
};


export const handler = withSentry(baseHandler);