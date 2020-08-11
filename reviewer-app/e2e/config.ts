const config = {
  baseUrl: process.env.PUBLIC_URL
};

export default config;

export interface Routes {
  login: string;
}

export const routes : Routes = {
  login: `/`,
};