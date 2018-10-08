MAKEFLAGS += --silent

.PHONY: help install start test test-api lint

.DEFAULT_GOAL := help

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

add: ## Add a new dependency. Usage: make add react
	docker-compose run webserver yarn $(MAKECMDGOALS)

%:
	@:

install: ## Install dependencies
	docker-compose run webserver yarn install

start: ## Start application
	docker-compose up -d

run: ## Start application and show logs
	docker-compose up

stop: ## Stop application
	docker-compose stop

test: ## Launch tests
	docker-compose run webserver yarn run test
