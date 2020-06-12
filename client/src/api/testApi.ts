import config from './config';
import { GenerateTestResponse } from 'abt-lib/requests/GenerateTest';
import { UpdateTestRequest, UpdateTestResponse } from 'abt-lib/requests/UpdateTest';
import cookies from 'js-cookie';
const { apiBase } = config;

export interface TestApi {
  generateTest(): Promise<GenerateTestResponse>;
  uploadImage(url: string, file: File | string, onUploadProgress: Function);
  updateTest(parameters: any) : Promise<UpdateTestResponse>;
  interpretResult(): Promise<UpdateTestResponse>;
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

function handleErrors(response: Response): Response {
  if (!response.ok) {
    throw new HTTPError({
      message: response.statusText,
      statusCode: response.status
    });
  }
  return response;
}

const testApi: TestApi = {
  generateTest: async (): Promise<GenerateTestResponse> => {
    const response = await fetch(`${apiBase}/generate`, {
      method: "POST",
      headers: {
        "Authorization": cookies.get('login-token'),
        "Content-Type": "application/json"
      }
    }).then(handleErrors);
    return response.json();
  },

  uploadImage: async (url, file, onUploadProgress) => {
    let type;
    // If this is a file upload
    if ((file as File).type) {
      type = (file as File).type;
    } else {
    // Otherwise they've used the camera
      type = 'image/png';
    }

    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();

      xhr.upload.onprogress = function(event) {
        onUploadProgress(((event.loaded / event.total) * 100).toFixed(0));
      };
      
      // track completion: both successful or not
      xhr.onloadend = function() {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject(xhr.response);
        }
      };

      xhr.open("PUT", url);
      xhr.setRequestHeader("Content-Type", type);
      xhr.send(file);
    });
  },

  updateTest: async (parameters: UpdateTestRequest): Promise<UpdateTestResponse> => {
    const response = await fetch(`${apiBase}/update`, {
      method: "POST",
      body: JSON.stringify(parameters),
      headers: {
        // @TODO: Change to actual jwt token once auth flow is settled
        "Authorization": cookies.get('login-token'),
        "Content-Type": "application/json"
      }
    }).then(handleErrors);
    return response.json();
  },

  interpretResult: async (): Promise<UpdateTestResponse> => {
    const response = await fetch(`${apiBase}/interpret`, {
      method: "POST",
      headers: {
        "Authorization": cookies.get('login-token'),
        "Content-Type": "application/json"
      }
    }).then(handleErrors);
    return response.json();
  }
};

export default testApi;