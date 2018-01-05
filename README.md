# Moozean
[![Build Status](https://travis-ci.org/FachschaftMathPhys/moozean.svg?branch=master)](https://travis-ci.org/FachschaftMathPhys/moozean)
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

1. Have an running instance of postgresql
2. Edit the `development.env` accordingly
3. Build the docker-image `docker build .`
4. Create the docker container: `docker create --env-file=development.env --name Moozean -p 3008:3000 <hash of the image>`
5. Start the container `docker start Moozean`
6. Create the database, if needed, `docker exec Moozean bundle exec rake db:create`
7. Migrate the database, if needed, `docker exec Moozean bundle exec rake db:migrate qc:update`
8. Done! Visit `localhost:3008`
