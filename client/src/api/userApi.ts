import config from "./config";
import { AuthenticateResponse, AuthenticateRequest } from 'abt-lib/requests/Authenticate';
import { handleErrors } from "./errors";
const { apiBase } = config;

export interface UserApi {
  authenticate(request: AuthenticateRequest): Promise<AuthenticateResponse>;
}
  
const userApi: UserApi = {
  authenticate: async (request: AuthenticateRequest): Promise<AuthenticateResponse> => {
    const response = await fetch(`${apiBase}/authenticate`, {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleErrors);
    return response.json();
  }
};  

export default userApi;