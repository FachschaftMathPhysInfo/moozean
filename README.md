# README

## Ruby version
The recommended software versions are
  - rails `>=5`
  - ruby `>=2.3`

## System dependencies

 Please have the following installed:
   - `npm`
   - `ember`, see [emberjs.com]
   - `rails` and `bundler`

## Database & Ember install

   Run `rake db:create db:migrate` and `rake ember:install`. Optionally run `rake ember:compile` to speed up.

## All in One for production

`bundle exec rake RAILS_ENV=production  SECRET_TOKEN=dummytoken db:create db:migrate ember:install ember:compile`

Then run: `rails -e production`

# Dockerimage

Build the image using docker-compose:
`docker-compose up --build`
