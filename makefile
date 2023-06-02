# development
local: api_local ui_local
local_init: api_local_build ui_local_init
clean: api_local_clean ui_local_clean

api_local:
	@docker compose up -d
api_local_build:
	@docker compose build
api_local_stop:
	@docker compose stop
api_local_clean:
	@docker compose down -v
api_local_migrate:
	@docker compose run --rm api bundle exec rails db:migrate
api_local_reset: api_local_clean api_local api_local_migrate

ui_local:
	@yarn website start
ui_local_init:
	@yarn install
ui_local_clean:
	@yarn website clean
	@yarn cache clean

# tests
test: api_test ui_test

api_test: api_local
	@docker compose run --rm api bundle exec rspec

ui_test:
	@yarn test
ui_lint:
	@yarn lint
