import Component from '@ember/component';

export default Component.extend({
  actions:{
    exitDialog:function(option){
      this.sendAction('closeDialog',this.get('report'),option);
    }
  }
});
