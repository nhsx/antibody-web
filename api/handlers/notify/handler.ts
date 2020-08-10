import AWS from 'aws-sdk';
import { APIGatewayProxyResult } from 'aws-lambda';
import config from '../../config';
import withSentry from 'serverless-sentry-lib';
import webpush, { PushSubscription } from 'web-push';


interface NotifyEvent {
  subscription: PushSubscription,
  wait: number
}

interface PrivateKeySecret {
  privateKey: string
}

export const baseHandler = async (event: NotifyEvent): Promise<APIGatewayProxyResult> => {

  const secretsmanager = new AWS.SecretsManager();
  const secret  = await secretsmanager.getSecretValue({ SecretId: "push-notification-vapid-private" })
    .promise()
    .then(({ SecretString }) => SecretString) as string;
  
  const privateKeySecret : PrivateKeySecret = JSON.parse(secret);
  const publicKey = "BD9NGDhi_Ff3-VoFXB2KuXMd_fn_X4iAGzYs3d_joyU57zV-OAY8oAo7Fl577F2rv3hi3d9GJ5UB-oqzRn7umdk";
  
  const pushSubscription = event.subscription;

  const payload = JSON.stringify({
    title: 'Your Antibody Test Timer has Finished',
    body: "Please click here to continue with your test",
    actions: [
      {
        action: 'return-to-test',
        title: 'Continue'
      }
    ]
  });

  // @TODO: get proper mailto address 
  const options = {
    vapidDetails: {
      subject: 'mailto:support@nhsx.nhs.uk',
      publicKey,
      privateKey: privateKeySecret.privateKey
    }
  };

  await webpush.sendNotification(
    pushSubscription,
    payload,
    options  
  );

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "NOTIFYING!" }),
    headers: config.defaultHeaders
  };
};



export const handler = withSentry(baseHandler);