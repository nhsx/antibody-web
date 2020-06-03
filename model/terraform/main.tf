provider "aws" {
  profile = "default"
  region  = "eu-west-2"
}

data "aws_caller_identity" "current" {}

terraform {
  backend "s3" {
    bucket = "nhsx-antibody-terraform-state"
    key    = "tfstate/terraform.state"
    region = "eu-west-2"
  }
}

resource "aws_vpc" "antibody-model" {
  cidr_block = "10.0.1.0/24"

  tags = {
    Name = "antibody-model"
  }
}

resource "aws_internet_gateway" "antibody-model-internet-gateway" {
  vpc_id = "${aws_vpc.antibody-model.id}"

  depends_on = ["aws_vpc.antibody-model"]

  tags = {
    Name = "antibody-model"
  }
}

resource "aws_route_table" "antibody-model-route-table" {
  vpc_id = "${aws_vpc.antibody-model.id}"

  depends_on = ["aws_internet_gateway.antibody-model-internet-gateway"]

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = "${aws_internet_gateway.antibody-model-internet-gateway.id}"
  }

  tags = {
    Name = "antibody-model"
  }
}

resource "aws_main_route_table_association" "antibody-model-main-route-table" {
  vpc_id         = "${aws_vpc.antibody-model.id}"
  route_table_id = "${aws_route_table.antibody-model-route-table.id}"
}


resource "aws_subnet" "antibody-model" {
  vpc_id     = "${aws_vpc.antibody-model.id}"
  cidr_block = "10.0.1.0/24"

  tags = {
    Name = "antibody-model"
  }
}

resource "aws_default_security_group" "antibody-model-default-security-group" {
  vpc_id = "${aws_vpc.antibody-model.id}"

  ingress {
    protocol    = "tcp"
    from_port   = 8080
    to_port     = 8080
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    protocol    = "tcp"
    from_port   = 8081
    to_port     = 8081
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "antibody-model"
  }
}

resource "aws_ecs_cluster" "antibody-model-cluster" {
  name = "antibody-model-cluster"
}

resource "aws_ecs_task_definition" "antibody-model-task-definition" {
  family                   = "antibody-model"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  memory                   = 512
  cpu                      = 256
  container_definitions    = templatefile("task-definitions/service.json", { account_id = data.aws_caller_identity.current.account_id })
  execution_role_arn       = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/ecsTaskExecutionRole"
}

resource "aws_ecs_service" "antibody-model-service" {
  name            = "antibody-model-service"
  cluster         = "${aws_ecs_cluster.antibody-model-cluster.id}"
  task_definition = "${aws_ecs_task_definition.antibody-model-task-definition.arn}"
  launch_type     = "FARGATE"
  network_configuration {
    assign_public_ip = true
    subnets          = ["${aws_subnet.antibody-model.id}"]
  }
  desired_count = 1
}
