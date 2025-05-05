.PHONY: install

SERVER_NPM_RUN=cd server && npm run
# DOCKER_PATH=/Applications/Docker.app/Contents/Resources/bin/docker 

install:
	cd client && npm install
	cd server && npm install

up-dev:
	docker compose -f docker-compose.yml up --build

down:
	docker compose -f docker-compose.yml down

migration-new:
	$(SERVER_NPM_RUN) migration:new

migration-up:
	$(SERVER_NPM_RUN) migration:up

migration-status:
	$(SERVER_NPM_RUN) migration:status