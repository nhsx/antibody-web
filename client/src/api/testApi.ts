import config from './config';
import { GenerateTestRequest, GenerateTestResponse } from 'abt-lib/requests/GenerateTest';

const { apiBase } = config;

export const generateTest = async (parameters: GenerateTestRequest): Promise<GenerateTestResponse> => {
  const response = await fetch(apiBase + "/generate", {
    method: "POST",
    body: JSON.stringify(parameters),
    headers: {
      "Content-Type": "application/json"
    }
  });
  return await response.json();
};

export const uploadImage = (url, file) => {
  const formData = new FormData();
  formData.append("image", file);
  return fetch(url, {
    method: "PUT",
    body: formData,
    "headers": {
      ContentType: "multipart/formdata"
    }
  });
};