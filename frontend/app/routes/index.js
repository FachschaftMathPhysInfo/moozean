import { hash } from 'rsvp';
import Route from '@ember/routing/route';

export default Route.extend({
  model:function(){
    return hash({folders:this.store.findAll('folder'),lents:this.store.findAll('lent')});
  }
  
});
