output "user-pool-id" {
  value = aws_cognito_user_pool.main.id
}

output "user-pool-arn" {
  value = aws_cognito_user_pool.main.arn
}

output "user-pool-client-id" {
  value = aws_cognito_user_pool_client.web-client.id
}
