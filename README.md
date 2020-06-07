# AWS_VideoshareWebsiteServerless
This project is aiming to build a serverless website on AWS for video sharing. It is completely serverless based on AWS, Auth0 and Google Firebase Infrastructure.

### Features
  - Create ELASTIC TRANSCODER Pipeline using Custom resource template via Lambda function.
  - Create Lambda Function to run TRANSCODER jobs.
  - Website for our video hosting platform and integration the website with Auth0
  - User Profile Lambda function to talk to Auth0 and retrieve information about the user.
  - API Gateway to invoke Lambda Function along with custom authorizer as Lambda Function to make
    sure that only authenticated users have access to the User Profile Lambda function.
  - Lambda function along with API Gateway to grant credentials/policy to upload files to the S3 bucket.
  - Firebase Realtime database for storing video information and pushing content to the browser.

### Challenge
  - How to create custom resource in serverless if cloudformation template is not available. I did it through calling Custom Lambda function during cloudformation deployment.
  - How to create Lambda authorizer for API Gateway.
  - Create user and pass on keys to Lambda function.
