import { hash } from 'rsvp';
import Route from '@ember/routing/route';

export default Route.extend({
  model:function(){
    return hash({subjects:this.store.findAll('subject'),
    typs:this.store.findAll('typ'),
    moduls:this.store.findAll('modul')});
  }
});
