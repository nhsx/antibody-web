import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { AuthenticateResponse, AuthenticateRequest } from 'abt-lib/requests/Authenticate';
import withSentry from 'serverless-sentry-lib';
import logger from '../../utils/logger';
import jwt from 'jsonwebtoken';
import { authenticate, getJWTSecret } from '../../api/authentication';
import { VerifyUserRequest } from '../../api/requests/VerifyUser';

export const baseHandler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {

  
  let request : AuthenticateRequest = JSON.parse(event.body as string);
  const verifyRequest : VerifyUserRequest = request;
  // The PII here (postcode and dob) should be completely transient here, from hereon we work only with orderId

  let { orderId } = verifyRequest;
  logger.info(`Authentication request for orderId ${orderId}`);
  // At the moment these two request types are equivalent but this will likely change
  let { success  } : { success: boolean } = await authenticate(verifyRequest);

  const jwtSecret = await getJWTSecret();
  
  if (success) {
    logger.info(`Authentication successful`);
    let body: AuthenticateResponse = {
      success,
      message: "Authentication successful",
      token: jwt.sign({ orderId }, jwtSecret as string, {
        expiresIn: 86400 // expires in 24 hours
      })
    }; 
    return {
      statusCode: 200,
      body: JSON.stringify(body)
    };
  } else {
    logger.info(`Authentication failed`);
    let body: AuthenticateResponse = {
      success: false,
      message: "Authentication failed"
    };
    return {
      statusCode: 403,
      body: JSON.stringify(body)
    };
  }
};

export const handler = withSentry(baseHandler);


