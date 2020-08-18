import AWS from 'aws-sdk';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import config from '../../../config';
import withSentry from 'serverless-sentry-lib';


interface NotifyEvent {
  subscription: PushSubscription,
  wait: number
}


export const baseHandler = async (event: APIGatewayEvent) : Promise<APIGatewayProxyResult> => {

  return {
    statusCode: 200,
    body: JSON.stringify({  }),
    headers: config.defaultHeaders
  };
};



export const handler = withSentry(baseHandler);