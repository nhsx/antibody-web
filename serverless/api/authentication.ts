import { VerifyUserResponse, VerifyUserRequest } from "./requests/VerifyUser";
import AWS from 'aws-sdk';

export async function authenticate(request : VerifyUserRequest): Promise<VerifyUserResponse> {

  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        success: true
      });
    }, 500);
  });

  // @TODO: Hook this into proper api once we have the api specification
  //const response: Response = await got(config.verifyUserUrl);
  //return response.body as VerifyUserResponse;
}

export async function getJWTSecret() {
  const secrets = new AWS.SecretsManager();
  const { SecretString: jwtSecret } = await secrets.getSecretValue({
    SecretId: "jwt-secret"
  }).promise();

  return jwtSecret;
}
  