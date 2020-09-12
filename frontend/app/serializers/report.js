import JSONAPISerializer from '@ember-data/serializer/json-api';

export default JSONAPISerializer.extend({
  serialize(){
    let json =this._super(...arguments);
    delete json.data.attributes['tex-available'];
    return json;
  }
});
