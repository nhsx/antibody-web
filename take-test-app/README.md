# NHSx Covid-19 Antibody Test at Home Web Service: Take the test

**This is a currently a Trial Service NOT a Live Service**

## Purpose

This application is for the end user who wishes to take an at home antibody test. As it stands, the application contains:

- A login to idenfity the user (currently placeholder)
- Some instructions to guide the user through the process
- A timer to ensure the user waits for the necessary time for the test kit to work
- A camera page to capture the image of the completed test kit
- A results screen for displaying the results to the user

All of this is integrated with the [api](../api/README.md) which handles the storing/updating of this data.

## Technical Documentation

The application is bootstrapped with Create React App [(https://github.com/facebook/create-react-app)](https://github.com/facebook/create-react-app) and deployed to an Amazon S3 bucket (using Cloudfront to serve it).

It is written in Typescript, and uses Yarn for dependency management.

### Environment variables

Environment variables are managed through `.env` files - to begin, copy the `example.env` file to `.env`, and replace the values with the values you wish to use.

| Environment variable | Purpose                          | Example               |
| -------------------- | -------------------------------- | --------------------- |
| REACT_APP_API_BASE   | The base URL for the API         | http://localhost:4000 |
| REACT_APP_STAGE      | The stage for the API in the URL | dev                   |

### Quick start

Ensure the environment variables are set and run the following to get the application running on `localhost:3000`:

```bash
yarn install
yarn start
```

### Installing dependencies

`yarn install`

### Running the application locally

To run the application:

`yarn start`

This runs by default on port 3000, if you wish to change the port you can run:

`PORT=<port> yarn start`

This will auto reload whenever a file is changed.

### Running the tests

To run the tests:

`yarn test`

By default this will run all the tests for the application. However when developing you may wish to run the tests in `watch` mode, which runs only the changed files and re-runs whenever the file is saved. To do this run:

`yarn run react-scripts test --watch`

### Building for deploy

To build a production version of this application:

`yarn build`
