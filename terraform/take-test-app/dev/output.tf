output "cloudfront-distribution" {
  value = aws_cloudfront_distribution.antibody-client.domain_name
}
