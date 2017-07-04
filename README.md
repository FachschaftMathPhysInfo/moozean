# README

## Ruby version
The recommended software versions are
  - rails `>=5.1`
  - ruby `>=2.3`

## System dependencies

 Please have the following installed:
   - `npm`
   - `ember`, see [emberjs.com]
   - `rails` and `bundler`
   - `postgresql`

## Database & Ember install

   Run `bundle install` to install all gems
   Run `rake db:drop db:create db:migrate` and `rake ember:install`. Optionally run `rake ember:compile` to speed up.

## All in One for production

`bundle exec rake RAILS_ENV=production  SECRET_TOKEN=dummytoken db:create db:migrate ember:install ember:compile`

Then run: `rails -e production`

For Anonymization (and later email retrieval): `rake qc:work`

# Dockerimage

Build the image using docker-compose:
`docker-compose up --build`

# Tasks: `classic-queue`

This project uses `classic-queue` for out-of-order tasks. Run `rake qc:update` after setup to update the tables and `rake qc:work` to start a worker.

#Email--support

In `config/email.yml` is the configuration of the email inbox. The programm automatically flages imported emails. Currently, it does **not** delete Emails in the INBOX at any point.

#Cronjob for Email support

As configured in config/schedule.rb this programm will check every 5 minutes for new mail.
Run `whenever` to see config. `whenever --update-crontab` will udate your crontab-file.
