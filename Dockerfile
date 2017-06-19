# Erstellt nach https://nickjanetakis.com/blog/dockerize-a-rails-5-postgres-redis-sidekiq-action-cable-app-with-docker-compose
FROM ruby:2.3-slim


MAINTAINER Henrik Reinstädtler <henrik@mathphys.fsk.uni-heidelberg.de>

RUN apt-get update && apt-get install -qq -y --no-install-recommends \
build-essential  nodejs npm libsqlite3-dev wget git
RUN ln -s /usr/bin/nodejs /usr/bin/node
#update nodejs
RUN npm cache clean -f
RUN npm install -g n
RUN n 6.9.0
RUN npm install -g bower
RUN npm install -g ember-cli
ENV INSTALL_PATH /ozean
ENV RAILS_LOG_TO_STDOUT true
#Ordner erstellen und wechseln
RUN mkdir -p $INSTALL_PATH
WORKDIR $INSTALL_PATH
#Gemfile kopieren
COPY Gemfile Gemfile.lock ./
#bundles installieren
RUN bundle install --binstubs
#und den rest kopieren
COPY . .
#ausführen

RUN bundle exec rake RAILS_ENV=production  SECRET_TOKEN=dummytoken db:create db:migrate ember:install ember:compile
RUN bundle exec rake qc:work &
VOLUME ["$INSTALL_PATH/public"]
ENV RAILS_ENV=production
ENV SECRET_TOKEN=dummytoken
#server ausführen
CMD     rails s
