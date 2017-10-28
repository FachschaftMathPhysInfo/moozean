import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  serialize(){
    let json =this._super(...arguments);
    delete json.data.relationships['reports'];
    delete json.data.relationships['subjects'];
    delete json.data.relationships['typs'];
    delete json.data.relationships['examinators'];
    delete json.data.relationships['moduls'];
    return json;
  }
});
