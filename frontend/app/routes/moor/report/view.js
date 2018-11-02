import { hash } from 'rsvp';
import Route from '@ember/routing/route';

export default Route.extend({
  model:function(params){
    return hash({
      others:{
      examinators:this.store.findAll('examinator'),
      folderseries:this.store.findAll('folderseries'),
      subjects:this.store.findAll('subject'),
      typs:this.store.findAll('typ'),
      moduls:this.store.findAll('modul')},
      report: this.store.find("report",params.id)
    });
  }
});
