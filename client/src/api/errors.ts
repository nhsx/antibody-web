export class HTTPError extends Error {

  public message: string;
  public statusCode: number;
  
  constructor({ message, statusCode }) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}
  
export function handleErrors(response: Response): Response {
  if (!response.ok) {
    throw new HTTPError({
      message: response.statusText,
      statusCode: response.status
    });
  }
  return response;
}
  