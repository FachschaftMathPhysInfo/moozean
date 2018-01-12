import { A } from '@ember/array';
import { typeOf } from '@ember/utils';
import { hash } from 'rsvp';
import Route from '@ember/routing/route';
import moment from 'moment';
export default Route.extend({
  model: function() {
    return hash({examinators: this.store.findAll('examinator'), folderseries: this.store.findAll('folderseries'), subjects: this.store.findAll('subject'),
     typs: this.store.findAll('typ'), moduls: this.store.findAll('modul')});
  }
});
