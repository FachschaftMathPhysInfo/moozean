# Erstellt nach https://nickjanetakis.com/blog/dockerize-a-rails-5-postgres-redis-sidekiq-action-cable-app-with-docker-compose
FROM ruby:2.4-slim


MAINTAINER Henrik Reinstädtler <henrik@mathphys.fsk.uni-heidelberg.de>

RUN apt-get update && apt-get install -qq -y --no-install-recommends \
build-essential  nodejs npm libpq-dev pdftk texlive-latex-extra wget git cron texlive-pstricks cups
RUN ln -s /usr/bin/nodejs /usr/bin/node
#update nodejs
RUN npm cache clean -f
RUN npm install -g n
RUN n 8
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
WORKDIR frontend
RUN npm install && bower install
#RUN bundle exec rake  db:create db:migrate ember:install ember:compile

WORKDIR ..
RUN RAILS_ENV=production PRODUCTION_DATABASE_ADAPTER="postgresql" bundle exec rake assets:precompile
#RUN whenever --update-crontab
VOLUME ["$INSTALL_PATH/public"]
CMD whenever --update-crontab & bundle exec rake qc:work & bundle exec rails s
