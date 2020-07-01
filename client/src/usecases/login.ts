import { AuthenticateRequest, AuthenticateResponse } from "abt-lib/requests/Authenticate";
import userApi from "api/userApi";

export default () => async (request: AuthenticateRequest): Promise<AuthenticateResponse> => {
  return await userApi.authenticate(request);
};
