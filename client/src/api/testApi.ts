import config from './config';
import { GenerateTestRequest, GenerateTestResponse } from 'abt-lib/requests/GenerateTest';

const { apiBase } = config;

export interface TestApi {
  generateTest(parameters: GenerateTestRequest): Promise<GenerateTestResponse>;
  uploadImage(url: string, file: any);
}

const testApi: TestApi = {
  generateTest: async (parameters: GenerateTestRequest): Promise<GenerateTestResponse> => {
    const response = await fetch(`${apiBase}/generate`, {
      method: "POST",
      body: JSON.stringify(parameters),
      headers: {
        "Content-Type": "application/json"
      }
    });
    return await response.json();
  },

  uploadImage: (url, file) => {
    let type;
    // If this is a file upload
    if (file.type) {
      type = file.type;
    } else {
    // Otherwise they've used the camera
      type = 'image/png';
    }
    return fetch(url, {
      method: "PUT",
      body: file,
      "headers": {
        "Content-Type": type
      }
    });
  }
};

export default testApi;