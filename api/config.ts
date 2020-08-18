export default {
  defaultHeaders: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin" : "*",
    "Access-Control-Allow-Credentials" : true
  },
  apiBase: `${process.env.REACT_APP_API_BASE}/${process.env.REACT_APP_STAGE}`,
  localFilePath: '/tmp/',
  rdtImagePath: 'rdt-images/',
  modelPath: 'predictions/fastrcnn',
  reviewChance: 1 // Always flags for review at the moment, set to 0.01 for 1%
};