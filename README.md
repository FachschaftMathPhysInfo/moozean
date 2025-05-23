# Moozean
[![Build Status](https://travis-ci.org/FachschaftMathPhys/moozean.svg?branch=master)](https://travis-ci.org/FachschaftMathPhys/moozean)
[![Maintainability](https://api.codeclimate.com/v1/badges/84ac36e28761fdd593b9/maintainability)](https://codeclimate.com/github/FachschaftMathPhys/moozean/maintainability)
# Requirements

## Ruby version
The recommended software versions are
  - rails `>=5.1`
  - ruby `>=2.3`
  - node `>=7`

## System dependencies
You should have the following packages installed (see Dockerfile)
  - `build-essential`
  - `nodejs`
  - `npm`
  - `libpq-dev`
  - `wget`
  - `git`
  - `cron`

You should provide a redis instance and an SMTP server.

We strongly recommend using the Docker--approach:

# Installation
## Non-Docker (Development environment)

1. Install all needed packages (see above)
1a. Update node to version 8: `sudo npm install -g n && sudo n 8`
1b. Install ember: `sudo npm install -g ember bower`
2. Clone this repository
3. set the needed environment variables(use `source development.sh` for a quickstart)
4. Create the needed database: `rake db:create db:migrate`
5. Precompile the assets: `rake assets:precompile`
6. Start the engines: `rails s`

## Docker
1. Set variables in `docker-compose.yml`
2. Build and start the docker container:
  ```bash
docker compose up --build -d
```
3. Next we need to seed the database with some test data:
  ```bash
docker compose exec web bundle exec rails db:seed 
docker compose exec web bundle exec rails db:migrate
```
