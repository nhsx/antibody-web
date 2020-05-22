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
    const formData = new FormData();
    formData.append("image", file);
    return fetch(url, {
      method: "PUT",
      body: formData,
      "headers": {
        ContentType: "multipart/formdata"
      }
    });
  }
};

export default testApi;