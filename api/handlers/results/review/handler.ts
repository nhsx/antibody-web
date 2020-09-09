import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import config from '../../../config';
import withSentry from 'serverless-sentry-lib';
import { deleteMessage } from '../../../api/review';
import { getTestRecord, putTestRecord } from '../../../api/storage';
import roleChecker from '../roleChecker/roleChecker';
import { ReviewResultRequest } from 'abt-lib/requests/ReviewResult';
import { validateReviewRequest } from '../../../api/validate';
import logger from '../../../utils/logger';

export const baseHandler = async (event: APIGatewayEvent) : Promise<APIGatewayProxyResult> => {

  const body: ReviewResultRequest = JSON.parse(event.body!);
  const guid = event.pathParameters?.guid;
  const DYNAMO_TABLE: string = process.env.DYNAMO_TABLE as string;
  const REVIEW_QUEUE_NAME: string = process.env.REVIEW_QUEUE_NAME as string;

  if (!body || !guid) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Missing request fields"
      }),
      headers: config.defaultHeaders
    };
  }

  const { value: { reviewedResult, receiptHandle }, error } = validateReviewRequest(body);

  if (error) {
    logger.error("Request failed validation", body, error);
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: error.details?.[0]?.message || "Invalid request body" 
      }),
      headers: config.defaultHeaders
    };
  }

  let record = await getTestRecord(DYNAMO_TABLE, guid);

  if (!record) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: `No record found with id ${guid}`
      }),
      headers: config.defaultHeaders
    };
  } else {
    record.review = {
      originalResult: record?.result!,
      status: "reviewed",
      reviewedResult: reviewedResult,
      reviewedAt: Date.now(),
      reviewerId: event.requestContext.identity.cognitoIdentityId!
    };
  }

  await putTestRecord(DYNAMO_TABLE, record);
  await deleteMessage(REVIEW_QUEUE_NAME, receiptHandle);

  return {
    statusCode: 200,
    body: JSON.stringify(record),
    headers: config.defaultHeaders
  };
};

export const handler = roleChecker(
  withSentry(baseHandler),
  ['reviewer', 'super-reviewer']
);