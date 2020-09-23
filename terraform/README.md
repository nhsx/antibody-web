# NHSx Covid-19 Antibody Test at Home Web Service: Terraform

**This is a currently a Trial Service NOT a Live Service**

This folder contains the Terraform for setting up the AWS infrastructure to run the entire service. An exception to this is the `api`, as that is written in Serverless and manages its own architecture.

## `ml`

**This is unused for now and likely to change in the future**

Infrastructure for hosing the machine learning API - A docker image which hosts an API.

It is currently structured as an ECS cluster behind a load balancer.

## `reviewer-app`

Infrastructure for hosting a build version of the reviewer app - which is hosted as a static website on S3. The application also uses AWS Cognito as a login provider for now which allows for role based access.

### 1 - Hosting

Sets up an s3 bucket to deploy the built site to, alongside a cloudfront distribution to allow serving the website all via `index.html`.

**Outputs**

- `cloudfront_distribution` - The URL to access the deployed app

### 2 - Login

Sets up a Cognito user pool, user groups, and web client for login for the reviewer app.

**Outputs**

- `user-pool-arn` - ARN for the created user pool
- `user-pool-id` - ID of the created user pool
- `user-pool-client-id` - Client ID for the created Cognito client

## `take-test-app`

Infrastructure for hosting a build version of the reviewer app - which is hosted as a static website on S3.

Currently this only exists as the `dev` environment, as the `prod` environment is controlled via the Serverless configuration, with the intent to migrate to Terraform in the future.

**Outputs**

- `cloudfront_distribution` - The URL to access the deployed app