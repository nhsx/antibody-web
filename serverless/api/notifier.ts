import AWS from 'aws-sdk';
import logger from '../utils/logger';


export interface NotifyOptions {
  wait?: Number;
}

export async function scheduleNotification(input: any, options: NotifyOptions) {


  logger.info('our arn is', process.env.STATE_MACHINE_ARN);

  var params = {
    stateMachineArn: process.env.STATE_MACHINE_ARN as string,
    input: JSON.stringify({ ...input, ...options })
  };
    

  logger.debug('scheduling timer notification', params);

  var stepfunctions = new AWS.StepFunctions();
    
  return  await stepfunctions.startExecution(params).promise();
}

