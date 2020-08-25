import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { Role } from "models/Role";
import logger from "../../../utils/logger";
import _ from 'lodash';
import config from '../../../config';

type Claims = {
  'cognito:groups': Role | Role[]
};

export default (handler: Function, allowedRoles: Role[]) => {
  if (process.env.IS_OFFLINE) {
    return handler;
  }

  return (event: APIGatewayEvent, context: Context) => {
    logger.info(`Checking user groups...`);

    console.log(event);
    const claims: Claims = event.requestContext.authorizer?.claims;

    let userRoles: Role[];

    // Convert a single provided role into an array
    if (Array.isArray(claims['cognito:groups'])) {
      userRoles = claims['cognito:groups'] as Role[];
    } else if (claims['cognito:groups'] as Role) {
      userRoles = [claims['cognito:groups'] as Role];
    } else {
      throw new Error("No groups attached to user");
    }

    // Check if our allowed roles match our supplied roles
    if (_.intersection(userRoles, allowedRoles).length) {
      logger.info(`Route authorised for role ${userRoles.join(", ")}`);
      return handler(event, context);
    } else return async () : Promise<APIGatewayProxyResult> => {
      logger.error(`User attempted to access unauthorised resource`);
      return {
        statusCode: 401,
        body: JSON.stringify({
          message: "You do not have the necessary permissions to access this resource"
        }),
        headers: config.defaultHeaders
      };
    };
  };
};