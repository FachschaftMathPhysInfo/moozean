import Ember from 'ember';

export default Ember.Controller.extend({
  newexaminator:{},
  showReportDialog:false,
  actions:{
    addExaminator:function(){
      this.set('newexaminator',this.store.createRecord('examinator'));
      this.set("showCreateExaminatorDialog",true);
    },
    editExaminator:function(examinator){
      this.set('newexaminator',examinator);
      this.set("showCreateExaminatorDialog",true);
    },
    deleteExaminator:function(examinator){
      examinator.get('reports').then((item)=>{
        if(item.length==0){
          examinator.destroyRecord();
        }
        else {
          this.set('newexaminator',examinator);
          this.set("showReportDialog",true);
        }
      });
    },
      closeDeleteExaminatorDialog:function(option) {
          this.set("showReportDialog",false);
        if(option=="ok"){
          this.get('newexaminator').destroyRecord();
        }
        else {
          this.set('newexaminator',null);
        }

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
