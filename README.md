# NHSx Covid-19 Antibody Test at Home Web Service

**This is a currently a Trial Service NOT a Live Service**

> Covid-19 Antibody Test at Home Web Service is a wep based service that will allow registered users to take an at home Covid-19 Antibody test and get a result of whether they test positive or negative for Covid-19 antibodies.

## Dependencies

1. Registering for a Covid-19 Antibody Test at Home Kit (URL TBC)

## User flows


## Screenshots


## Nomenclature


## Technical documentation

The front client for this project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
The server side service is hosted on AWS.
It is deployed to AWS utilising Github actions the Serverless framework where we deploy the web client to Cloud Front and the server side backend  to API Gateway, Lambda function, DynamoDB and S3 to store images.


In the project **client** directory, you can run:

### Install Dependencies
To install dependent modules.

```bash
yarn install
```

### Running the service locally

Create your client/.env file - rename example.env -> .env for local development

```bash
yarn dev
```

Runs the front and back end app in development mode. This will run serverless in offline mode, and you will hit localhost endpoints.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

You will also see any lint errors in the console.

### Running Tests

Launches the test runner in the interactive watch mode.

```bash
yarn test
```

This will run front and back-end tests sequentially. Run the same command from the client or serverless folder to run tests independently.

### Building a production version

Builds the app for production to the `build` folder.

```bash
yarn build
```
