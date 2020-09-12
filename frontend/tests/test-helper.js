import Application from 'ember-ozean/app';
import config from 'ember-ozean/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

start();
