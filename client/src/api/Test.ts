import config from './config';
import { GenerateTestRequest, GenerateTestResponse } from 'abt-lib/requests/GenerateTest';

const { apiBase } = config;

export const generateTest = (parameters: GenerateTestRequest): Promise<Response> => {
  return fetch(apiBase + "/generate", {
    method: "POST",
    body: JSON.stringify(parameters),
    headers: {
      contentType: "application/json"
    }
  });
};