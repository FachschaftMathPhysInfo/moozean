import Mixin from '@ember/object/mixin';

export default Mixin.create({
  actions:{
    addStudent: function() {
      var store = this.store;
      this.set('newstudent', store.createRecord('student'));
      this.set("showDialog", true);
    }
}
});
