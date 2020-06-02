import config from './config';
import { GenerateTestResponse } from 'abt-lib/requests/GenerateTest';
import { UpdateTestRequest, UpdateTestResponse } from 'abt-lib/requests/UpdateTest';
import cookies from 'js-cookie';
const { apiBase } = config;

export interface TestApi {
  generateTest(): Promise<GenerateTestResponse>;
  uploadImage(url: string, file: any);
  updateTest(parameters: any);
}


function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
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

  uploadImage: async (url, file) => {
    let type;
    // If this is a file upload
    if (file.type) {
      type = file.type;
    } else {
    // Otherwise they've used the camera
      type = 'image/png';
    }
    const response = await fetch(url, {
      method: "PUT",
      body: file,
      "headers": {
        "Content-Type": type
      }
    }).then(handleErrors);
    return response.json();
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
  }
};

export default testApi;