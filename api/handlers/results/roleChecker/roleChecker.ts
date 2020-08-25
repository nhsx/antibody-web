import { APIGatewayEvent, Context } from "aws-lambda";
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

  return async (event: APIGatewayEvent, context: Context) => {

    logger.info(`Checking user groups...`);
    const claims: Claims = event.requestContext.authorizer?.claims;
    let userRoles: Role[] = [];

    if (!claims['cognito:groups']) {
      logger.error(`User without a role assigned attempted to access a protected route`);
      return {
        statusCode: 401,
        body: JSON.stringify({
          message: "You have not been assigned to a role"
        }),
        headers: config.defaultHeaders
      };
    }

    // Convert a single provided role into an array
    if (Array.isArray(claims['cognito:groups'])) {
      userRoles = claims['cognito:groups'] as Role[];
    } else {
      userRoles = [claims['cognito:groups'] as Role];
    }

    // Check if our allowed roles match our supplied roles
    if (_.intersection(userRoles, allowedRoles).length) {
      logger.info(`Route authorised for role(s): ${userRoles.join(", ")}`);
      return handler(event, context);
    } else {
      logger.error(`User with role(s): ${userRoles.join(",")} attempted to access unauthorised resource requiring role(s): ${allowedRoles.join(",")}`);
      return {
        statusCode: 401,
        body: JSON.stringify({
          message: "You do not have the necessary permissions to access this resource"
        }),
        headers: config.defaultHeaders
      };
    }
  };
};