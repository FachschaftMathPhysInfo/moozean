import Ember from 'ember';

export default Ember.Controller.extend({
  newexaminator:{},
  actions:{
    addExaminator:function(){
      this.set('newexaminator',this.store.createRecord('examinator'));
      this.set("showCreateExaminatorDialog",true);
    },
    editExaminator:function(examinator){
      this.set('newexaminator',examinator);
      this.set("showEditExaminatorDialog",true);
    },
    deleteExaminator:function(examinator){
      examinator.destroyRecord();
    },
    closeExaminatorDialog:function(option){
      if(option=="ok"){
        this.get('newexaminator').save().then(null,this.ajaxError.bind(this))
      } else
      {
        if(this.get('showCreateExaminatorDialog'))
        this.get('newexaminator').unloadRecord();
      }
      this.set('showCreateExaminatorDialog',false);
      this.set('showEditExaminatorDialog',false);
    }
  }
});
