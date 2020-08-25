output "cloudfront-distribution" {
  value = aws_cloudfront_distribution.antibody-reviewer-frontend.domain_name
}
