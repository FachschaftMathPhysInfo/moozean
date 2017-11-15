import { hash } from 'rsvp';
import Route from '@ember/routing/route';
import moment from 'moment';
export default Route.extend({
  model:function(params){
    return hash({
      examinators:this.store.findAll('examinator'),
      folderseries:this.store.findAll('folderseries'),
      subjects:this.store.findAll('subject'),
      typs:this.store.findAll('typ'),
      moduls:this.store.findAll('modul'),
      report: this.store.createRecord('report',{pdf:'',tex:''}),
      mail:this.store.find('inmail',params.id)
    });
  }
});
