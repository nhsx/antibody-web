const config = {
  baseUrl: process.env.PUBLIC_URL
};

export default config;

export interface Routes {
  login: string;
  step(stepName: string);
}

export const routes : Routes = {
  login: `/`,
  step: (stepName) => `/steps/${stepName}` // Rather than hardcoding these in to our tests and fixing in multiple places (as content + steps are likely to change) we just keep step names in our tests for now and fetch dynamically
};