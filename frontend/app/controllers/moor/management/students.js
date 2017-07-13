import Ember from 'ember';

export default Ember.Controller.extend({
  newstudent:{},
  actions:{
    addstudent:function(){
      this.set('newstudent',this.store.createRecord('student'));
      this.set("showCreatestudentDialog",true);
    },
    editstudent:function(student){
      this.set('newstudent',student);
      this.set("showEditstudentDialog",true);
    },
    deletestudent:function(student){
      student.destroyRecord();
    },
    closestudentDialog:function(option){
      if(option=="ok"){
        this.get('newstudent').save();
      } else
      {
        if(this.get('showCreatestudentDialog'))
        this.get('newstudent').unloadRecord();
      }
      this.set('showCreatestudentDialog',false);
      this.set('showEditstudentDialog',false);
    }
  }
});
