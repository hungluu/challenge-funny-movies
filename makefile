# development
local: api_local
local_init: api_local_build
clean: api_local_clean

api_local:
	@docker compose up -d
api_local_build:
	@docker compose build
api_local_stop:
	@docker compose stop
api_local_clean:
	@docker compose down -v

# tests
test: api_test

api_test: api_local
	@docker compose run --rm api rails test

