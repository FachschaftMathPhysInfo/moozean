import Component from '@ember/component';

export default Component.extend({
  selected: false,
  actions:{
    toggleSelection:function(){
      this.set('selected',!this.get('selected'));
      let a=this.get('printselection').filter((item)=>{
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
      this.sendAction('printReportComp',this.get('report'));
    }

  }
});
