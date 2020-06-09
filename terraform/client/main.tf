provider "aws" {
  profile = "default"
  region  = "eu-west-2"
}

data "aws_caller_identity" "current" {}

terraform {
  backend "s3" {
    bucket = "nhsx-antibody-terraform-state"
    key    = "tfstate/client.state"
    region = "eu-west-2"
  }
}

variable "stage" {
  type        = "string"
  description = "The stage to deploy the application into (dev / prod)"
}

resource "aws_s3_bucket" "antibody-client" {
  bucket = "${var.stage}-covid9-antibody-uk-client-terraform"
  website {
    index_document = "index.html"
  }
}
