# NHSx Covid-19 Antibody Test at Home Web Service: API

**This is a currently a Trial Service NOT a Live Service**

## Purpose

This API connects the multiple parts of the service together, it provides:

- The API for taking the test, including (temporary) login, current state, and submission
- A connection between the take test app and the machine learning API for interpretation of user submitted images
- The API for reviewing test results, allowing role based access to getting images to review and submitting their answers

### Functions

**For taking the test**

`generate`

Creates a new test record for the logged in user based on the user ID.

`update`

Updates the test record for the logged in user

`interpret`

Sends the users uploaded image to the machine learning API, and subsequently updates the test record with the returned result.

`notify`

Allows for push notifications to be created for the timer finishing.

**For reviewing test results**

`results/next`

Gets the next result for review for the logged in user based on their role

- A reviewer will get images needing an initial review
- A super-reviewer will get images needing an additional review

`results/review`

Allows reviewers to submit their review of the result

## Technical Documentation

The application is a Serverless [(https://www.serverless.com/)](https://www.serverless.com/) application deployed onto AWS.

### Running the application locally

You can run the application in "offline" mode by running:

`serverless offline`

### Deploying

The application can be deployed in multiple stages, if one isn't provided the default will be `dev`.

To deploy an application to a stage you can run the following:

`serverless deploy -s <stage>`