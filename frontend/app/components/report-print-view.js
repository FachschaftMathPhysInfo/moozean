import Ember from 'ember';

export default Ember.Component.extend({
  selected: false,
  actions:{
    toggleSelection:function(){
      this.set('selected',!this.get('selected'));
      let a=this.get('printselection').filter((item)=>{
        console.log(item);
        return item.get('report.id')==this.get('report.id');
      });
      if(a.length>0){
        this.get('printselection').removeObject(a[0]);
      }
      else{
        this.set('reportslist',[this.get('report')]);
        this.set('auswahl',true);
        this.set('showPruefDialog',true);
      }
      this.set('printselection',this.get('printselection').slice());
    },
    printReport:function(){
      this.sendAction('printReport',this.get('report'));
    }

  }
});
