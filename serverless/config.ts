export default {
  defaultHeaders: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin" : "*"
  },
  apiBase: `${process.env.REACT_APP_API_BASE}/${process.env.REACT_APP_STAGE}`,
  localFilePath: '/tmp/',
  rdtImagePath: 'rdt-images/',
  modelPath: 'predictions/nest101'
};