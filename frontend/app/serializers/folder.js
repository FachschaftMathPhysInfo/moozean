import JSONAPISerializer from '@ember-data/serializer/json-api';

export default JSONAPISerializer.extend({
  serialize(){
    let json =this._super(...arguments);
    delete json.data.attributes['obligationtoreport'];
    delete json.data.attributes['name'];
    return json;
  }
});
