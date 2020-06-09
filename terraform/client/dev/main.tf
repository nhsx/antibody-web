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

locals {
  s3_bucket_name = "dev-covid19-antibody-client-terraform"
  s3_origin_id   = "dev-antibody-client-origin"
}

resource "aws_s3_bucket" "antibody-client" {
  bucket = "${local.s3_bucket_name}"

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

resource "aws_cloudfront_distribution" "antibody-client" {
  origin {
    domain_name = "${aws_s3_bucket.antibody-client.bucket_regional_domain_name}"
    origin_id   = "${local.s3_origin_id}"

    s3_origin_config {
      origin_access_identity = "${aws_cloudfront_origin_access_identity.antibody-client.cloudfront_access_identity_path}"
    }
  }

  enabled             = true
  default_root_object = "index.html"

  custom_error_response {
    error_caching_min_ttl = 0
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
  }

  custom_error_response {
    error_caching_min_ttl = 0
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
  }

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "${local.s3_origin_id}"
    viewer_protocol_policy = "allow-all"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    max_ttl     = 0
    default_ttl = 0
    min_ttl     = 0
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}
