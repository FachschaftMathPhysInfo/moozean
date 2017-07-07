import Ember from 'ember';
import moment from 'moment';
export default Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({examinators: this.store.findAll('examinator'), folderseries: this.store.findAll('folderseries'), subjects: this.store.findAll('subject'), typs: this.store.findAll('typ'), moduls: this.store.findAll('modul')});
  },
  serializeQueryParam: function(value, urlKey, defaultValueType) {
    console.log("Seri", value, urlKey, defaultValueType);
    if (Ember.typeOf(value) == "instance") {
      return value.get("id");
    }
    if (moment.isMoment(value)) {
      let date = value.format();
      return JSON.stringify(date);
    }
    if (defaultValueType === 'array') {
      let va = Ember.A();
      value.forEach((item) => {
        va.pushObject(item.get("id"));
      });
      return JSON.stringify(va);

      // Original: return JSON.stringify(value);
    }
    //console.log(Ember.typeOf(value));
    return '' + value;
  },
  deserializeQueryParam: function(value, urlKey, defaultValueType) {
    console.log(value, urlKey, defaultValueType);
    if (defaultValueType === 'array') {
      var typus = (urlKey[urlKey.length - 1] == 's')
        ? urlKey
        : urlKey.slice(0, -1);
      var arr = [];
      value = JSON.parse(value);
      for (var i = 0; i < value.length; i++) {
        arr.push(this.store.find(typus, parseInt(value[i], 10)));
      }

      return arr;

      // Original: return Ember.A(JSON.parse(value));
    }
    if (defaultValueType === 'undefined') {
      return this.store.find(urlKey, value);
    }
    if (moment(JSON.parse(value)).isValid()) {
      return moment(JSON.parse(value));
    }
    //console.log(urlKey.slice(-2,urlKey.length));
    if (urlKey.slice(-2, urlKey.length).toLowerCase() == 'at') {
      return value;
    }
    if (defaultValueType === 'boolean') {
      return (value === 'true')
        ? true
        : false;
    } else if (defaultValueType === 'number') {
      return (Number(value)).valueOf();
    }

    return value;
  }

});
