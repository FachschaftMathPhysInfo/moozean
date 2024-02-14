import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  serialize(){
    let json =this._super(...arguments);
    if(json.data.relationships){
    delete json.data.relationships['reports'];
  }
    return json;
  }
});
