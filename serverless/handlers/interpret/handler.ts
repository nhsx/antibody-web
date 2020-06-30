import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { validateInterpretEnvironment } from '../../api/validate';
import { AugmentedAIRuntime } from 'aws-sdk';
import config from '../../config';
import logger from '../../utils/logger';
import withSentry from 'serverless-sentry-lib';

export const baseHandler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {

  const UPLOAD_BUCKET: string = process.env.UPLOAD_BUCKET as string;

  const guid = event.requestContext.authorizer?.principalId;

  logger.info("Interpreting result for user with guid:", guid);

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

  const { error: envError } = validateInterpretEnvironment(process.env);

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
  
  // Create the human loop input JSON object
  const humanLoopInput = {
    taskObject: `s3://${UPLOAD_BUCKET}/rdt-images/${guid}`
  };

  const a2i = new AugmentedAIRuntime();

  await a2i.stopHumanLoop({
    HumanLoopName: `${guid}-result-interpretation`
  });
  await a2i.startHumanLoop({
    HumanLoopName: `${guid}-result-interpretation`,
    FlowDefinitionArn: "arn:aws:sagemaker:eu-west-2:877130379437:flow-definition/interpret",
    HumanLoopInput: {
      
      InputContent: JSON.stringify(humanLoopInput)
    }
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "success"
    })
  };
};

export const handler = withSentry(baseHandler);