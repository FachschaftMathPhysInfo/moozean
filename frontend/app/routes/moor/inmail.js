import Route from '@ember/routing/route';

export default Route.extend({
  model:function(){
    return this.store.query('inmail',{filter:{archived:false}});
  }
});
