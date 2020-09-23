# NHSx Covid-19 Antibody Test at Home Web Service: Review test results

**This is a currently a Trial Service NOT a Live Service**

## Purpose

This application is to allow trained users to ensure the quality of the machine learning algorithm by performing quality assurance checks against random results.

It currently has the following functionality:

- Login as a particular user role (currently using Cognito)
- Fetch the next relevant result from the API for the user
- Submit the review of the result

All of this is integrated with the [api](../api/README.md) which handles the storing/updating of this data.

## User guide

### Roles

There are two roles in the application, `reviewer`, and `super-reviewer`, with separate image queues for each.

Images go through a multi-stage review, firstly they get passed to the _reviewers_, if they disagree with the inital result, it will be sent to a _super-reviewer_ to validate.

In order to run this locally and test this - it is worthwhile making 2 accounts on Cognito, one for each role.

### Password requirements

Cognito default password requirements are as follows:

- At least 8 characters
- At least one upper case letter
- At least one lower case letter
- At least one special symbol
- At least one number

For example `Password2!`

## Technical Documentation

The application is bootstrapped with Create React App [(https://github.com/facebook/create-react-app)](https://github.com/facebook/create-react-app) and deployed to an Amazon S3 bucket (using Cloudfront to serve it).

It is written in Typescript, and uses Yarn for dependency management.

### Environment variables

Environment variables are managed through `.env` files - to begin, copy the `example.env` file to `.env`, and replace the values with the values you wish to use.

| Environment variable              | Purpose                                                     | Example               |
| --------------------------------- | ----------------------------------------------------------- | --------------------- |
| REACT_APP_API_BASE                | The base URL for the API                                    | http://localhost:4000 |
| REACT_APP_STAGE                   | The stage for the API in the URL                            | dev                   |
| REACT_APP_USER_POOL_ID            | The ID of the user pool on cognito                          | some-user-pool-id     |
| REACT_APP_USER_POOL_WEB_CLIENT_ID | The client ID for a client that has access to the user pool | some-web-client-id    |
| REACT_APP_AWS_REGION              | The AWS Region that the user pool is hosted in              | eu-west-1             |

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
