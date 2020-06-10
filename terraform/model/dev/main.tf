provider "aws" {
  profile = "default"
  region  = "eu-west-2"
}

data "aws_caller_identity" "current" {}

locals {
  service-name = "antibody-model-dev"
}

terraform {
  backend "s3" {
    bucket = "nhsx-antibody-terraform-state"
    key    = "tfstate/model/dev.state"
    region = "eu-west-2"
  }
}

resource "aws_vpc" "antibody-model" {
  cidr_block = "10.0.0.0/16"

  tags = {
    Name = "${local.service-name}"
  }
}

resource "aws_internet_gateway" "antibody-model-internet-gateway" {
  vpc_id = "${aws_vpc.antibody-model.id}"

  depends_on = ["aws_vpc.antibody-model"]

  tags = {
    Name = "${local.service-name}"
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
    Name = "${local.service-name}"
  }
}

resource "aws_main_route_table_association" "antibody-model-main-route-table" {
  vpc_id         = "${aws_vpc.antibody-model.id}"
  route_table_id = "${aws_route_table.antibody-model-route-table.id}"
}


resource "aws_subnet" "antibody-model-1" {
  vpc_id               = "${aws_vpc.antibody-model.id}"
  cidr_block           = "10.0.0.0/24"
  availability_zone_id = "euw2-az1"

  tags = {
    Name = "${local.service-name}"
  }
}

resource "aws_subnet" "antibody-model-2" {
  vpc_id               = "${aws_vpc.antibody-model.id}"
  cidr_block           = "10.0.1.0/24"
  availability_zone_id = "euw2-az2"

  tags = {
    Name = "${local.service-name}"
  }
}

resource "aws_default_security_group" "antibody-model-default-security-group" {
  vpc_id = "${aws_vpc.antibody-model.id}"

  ingress {
    protocol        = "tcp"
    from_port       = 8080
    to_port         = 8080
    security_groups = ["${aws_security_group.lb-security-group.id}"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${local.service-name}"
  }
}

resource "aws_security_group" "lb-security-group" {
  vpc_id = "${aws_vpc.antibody-model.id}"

  ingress {
    protocol    = "tcp"
    from_port   = 80
    to_port     = 80
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${local.service-name}"
  }
}

resource "aws_lb" "antibody-model" {
  name               = "${local.service-name}-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = ["${aws_security_group.lb-security-group.id}"]
  subnets            = ["${aws_subnet.antibody-model-1.id}", "${aws_subnet.antibody-model-2.id}"]
}

resource "aws_lb_target_group" "antibody-model" {
  name        = "${local.service-name}-target-group"
  vpc_id      = "${aws_vpc.antibody-model.id}"
  port        = 8080
  protocol    = "HTTP"
  target_type = "ip"

  health_check {
    enabled  = true
    interval = 10
    path     = "/ping"
  }
}

resource "aws_lb_listener" "antibody-model" {
  load_balancer_arn = "${aws_lb.antibody-model.arn}"
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = "${aws_lb_target_group.antibody-model.arn}"
  }
}

resource "aws_ecs_cluster" "antibody-model-cluster" {
  name = "${local.service-name}-cluster"
}

resource "aws_ecs_task_definition" "antibody-model-task-definition" {
  family                   = "${local.service-name}"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  memory                   = 2048
  cpu                      = 1024
  container_definitions    = templatefile("task-definitions/service.json", { account_id = data.aws_caller_identity.current.account_id })
  execution_role_arn = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/ecsTaskExecutionRole"
}

resource "aws_ecs_service" "antibody-model-service" {
  name            = "${local.service-name}-service"
  cluster         = "${aws_ecs_cluster.antibody-model-cluster.id}"
  task_definition = "${aws_ecs_task_definition.antibody-model-task-definition.arn}"
  launch_type     = "FARGATE"

  network_configuration {
    assign_public_ip = true
    subnets          = ["${aws_subnet.antibody-model-1.id}", "${aws_subnet.antibody-model-2.id}"]
  }

  load_balancer {
    target_group_arn = "${aws_lb_target_group.antibody-model.arn}"
    container_name   = "${local.service-name}-container"
    container_port   = 8080
  }

  desired_count = 1

  depends_on = [
    "aws_lb_listener.antibody-model"
  ]
}
