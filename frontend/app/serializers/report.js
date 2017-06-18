import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  serialize(snapshot){
    let json =this._super(...arguments);
    delete json.data.attributes['tex-available'];
    return json;
  }
});
