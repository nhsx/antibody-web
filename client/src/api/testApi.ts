import config from './config';
import { GenerateTestRequest, GenerateTestResponse } from 'abt-lib/requests/GenerateTest';

const { apiBase } = config;

export interface TestApi {
  generateTest(parameters: GenerateTestRequest): Promise<GenerateTestResponse>;
  uploadImage(url: string, file: File);
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

    return fetch(url, {
      method: "PUT",
      body: file,
      "headers": {
        "Content-Type": file.type
      }
    });
  }
};

export default testApi;