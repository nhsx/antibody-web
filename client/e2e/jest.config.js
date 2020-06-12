// Make our test.env variables available
const resolve = require('path').resolve

require('dotenv').config({ path: resolve(__dirname,"../.env") });

module.exports = {
  preset: "./preset.js",
  testMatch: ["**/specs/*.ts"],
  transform: {
    '^.+\\.(js|ts|tsx)$': 'ts-jest',
  },
  verbose: true
};
