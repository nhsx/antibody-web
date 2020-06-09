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

resource "aws_s3_bucket" "antibody-client" {
  bucket = "dev-covid9-antibody-uk-client-terraform"

  website {
    index_document = "index.html"
  }
}

resource "aws_cloudfront_origin_access_identity" "antibody-client" {
  comment = "Created by terraform | Cloudfront origin access identity for antibody client"
}

data "aws_iam_policy_document" "client-s3-policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.antibody-client.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = ["${aws_cloudfront_origin_access_identity.antibody-client.iam_arn}"]
    }
  }
}

resource "aws_s3_bucket_policy" "client-s3-policy" {
  bucket = "${aws_s3_bucket.antibody-client.id}"
  policy = "${data.aws_iam_policy_document.client-s3-policy.json}"
}
