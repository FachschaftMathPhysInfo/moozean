import Ember from 'ember';

export default Ember.Controller.extend({
  items:[],
  titlestudent:"Studierendes eintragen",
  bleibendeOrdner:[{name:"KP1A"},{name:"KM1A"}],
  ordner:[],
  newstudent:{},
  sumordner:Ember.computed('ordner.[]',function(){
      var result =[];
      var ordner=this.get('ordner');
      ordner.forEach(function(item){result.push(item.get('name'));
      });
    return result;
  }),
  student:null,
  studentselected:Ember.computed('student',function(){
    console.log(this.get('student'));
    return this.get('student')==null;
  }),
  ausleihbar:Ember.computed('studentselected','ordner.[]',function(){
    return this.get('studentselected') &&(this.get('ordner').length==0);
  }),
  showDialog:false,
  actions:{
    addStudent:function(){
      this.set('newstudent',this.store.createRecord('student'));
      this.set("showDialog",true);
    },
    editStudent:function(student){
       this.set('newstudent',student);
       console.log(student);
       this.set('titlestudent','Studierendes bearbeiten');
       this.set("showDialog",true);
    },
    closeDialog:function(option,student){
      console.log(this.newstudent);
      console.log(this.get('newstudent'));
      if(option=="ok"){
        console.log(this.get('newstudent'));
        let foo=function(_this){return function(){
          _this.set('student',_this.get('newstudent'));
          _this.set('newstudent',_this.store.createRecord('student'));
          _this.set("showDialog",false);
      }};
        if(this.get('newstudent').save!=null)
        this.get('newstudent').save().then(foo(this),function(reason) {
          alert(reason);//TODO: FIXME
  })
  else this.get('newstudent').content.save().then(foo(this),function(reason) {
    alert(reason);//TODO: FIXME
});
}else{
  if(this.get('newstudent').unloadRecord!=null)
  this.get('newstudent').unloadRecord();
  this.set("showDialog",false);
}
    },
    searchStudent:function(data){
      return this.store.query('student', {
        filter: {
          name: '%'+data+'%'
        }
      })
    },
    saveModel:function(data){
      let folders = this.get('ordner');
      for(var i=0;i<folders.length;i++ ){
        console.log(folders[i]);
        let lent = this.store.createRecord('lent',{student:this.get('student'),folder:folders[i]});
        lent.save().then(function(_this){return function(data){
          _this.set('currentStep',0);
          _this.set('student',{});
        }}(this));
      }
    },
    addFolder:function(data){
      this.ordner.pushObject(data);
    },
    removeFolder:function(data){
      this.ordner.removeObject(data);
    },
    giveBack:function(lent){
      let returned=this.store.createRecord('returned',{lentat:lent.get('createdAt'),student:lent.get('student'),folder:lent.get('folder')});
      returned.save();
      lent.destroyRecord();
    },
    mail:function(lent){
      alert("Mail an "+lent.get('student.name')+" versandt!");
    }
  }
});
