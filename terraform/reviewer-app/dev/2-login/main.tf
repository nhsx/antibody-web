provider "aws" {
  profile = "default"
  region  = "eu-west-2"
}

data "aws_caller_identity" "current" {}

terraform {
  backend "s3" {
    bucket = "nhsx-antibody-terraform-state"
    key    = "tfstate/reviewer/cognito.state"
    region = "eu-west-2"
  }
}

resource "aws_cognito_user_pool" "main" {
  name = "antibody-reviewer-results-user-pool"
}

resource "aws_cognito_user_group" "reviewer" {
  name         = "reviewer"
  user_pool_id = aws_cognito_user_pool.main.id
}

resource "aws_cognito_user_group" "super-reviewer" {
  name         = "super-reviewer"
  user_pool_id = aws_cognito_user_pool.main.id
}

resource "aws_cognito_user_pool_client" "web-client" {
  name          = "reviewer-app-frontend-client"
  user_pool_id  = aws_cognito_user_pool.main.id
  explicit_auth_flows = ["USER_PASSWORD_AUTH"]
}
