import { A } from '@ember/array';
import { computed } from '@ember/object';
import Controller from '@ember/controller';
import paginatedResults from "ember-ozean/mixins/paginated-result";

export default Controller.extend(paginatedResults,{
  init() {
    this._super(...arguments);
    this.newexaminator = this.newexaminator || {};
  },
  showReportDialog:false,
  page: 1,
  resultsLength:computed('meta.record-count',function(){
    return this.get("meta.record-count");
  }),
  limitOptions: A([10, 20, 30]),
  limit:20,
  paginatedResults: computed('page', 'limit','model.[]', function() {
    return this.queryPaginated("examinator",this.get("page",this.get("limit")))
  }),
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
        this.get('newexaminator').save().then(null);
      } else
      {
        if(this.get('newexaminator.id')!=null){
          this.get('newexaminator').then((item)=>{
            item.rollbackAttributes();
          });
        }
        else {
          this.get('newexaminator').destroyRecord();
        }
      }
      this.set('showCreateExaminatorDialog',false);
      this.set('showEditExaminatorDialog',false);
    }
  }
});
