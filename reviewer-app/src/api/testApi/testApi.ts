import { NextResultResponse } from "abt-lib/requests/NextResult";
import { Auth } from "aws-amplify";

export interface TestApi {
  nextResultToReview: () => Promise<NextResultResponse>;
}

export class HTTPError extends Error {
  public message: string;
  public statusCode: number;

  constructor({ message, statusCode }) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

// We throw on HTTP failures
function handleErrors(response: Response): Response {
  if (!response.ok) {
    throw new HTTPError({
      message: response.statusText,
      statusCode: response.status || 500,
    });
  }
  return response;
}

export default ({ apiBase }: { apiBase: string }): TestApi => ({
  nextResultToReview: async () => {
    const session = await Auth.currentSession();
    const response = await fetch(`${apiBase}/results/next`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session.getIdToken().getJwtToken()}`
      },
    }).then(handleErrors);

    if (response.status === 204) {
      return null;
    } else {
      return response.json();
    }
  },
});
