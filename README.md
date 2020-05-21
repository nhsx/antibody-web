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
yarn start
```

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

You will also see any lint errors in the console.

### Running Tests

Launches the test runner in the interactive watch mode.

```bash
yarn test
```

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Building a production version

Builds the app for production to the `build` folder.

```bash
yarn build
```

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


## Code of Conduct
[Code of Conduct](./CODE_OF_CONDUCT.md)

## Licence

[MIT License](./LICENSE.md)


