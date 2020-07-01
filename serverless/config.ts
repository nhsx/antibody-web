export default {
  defaultHeaders: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin" : "*"
  },
  apiBase: `${process.env.REACT_APP_API_BASE}/${process.env.REACT_APP_STAGE}`,
  verifyUserUrl: "http://www.WORKSTREAM2URLHERE.COM/verify",
  authenticationExpiry: 86400, // 24 hours
  localFilePath: '/tmp/',
  rdtImagePath: 'rdt-images/',
  modelPath: 'predictions/nest101'
};