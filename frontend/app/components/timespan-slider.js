import { schedule } from '@ember/runloop';
import { observer } from '@ember/object';
import { on } from '@ember/object/evented';
import Component from '@ember/component';
import moment from 'moment';
export default Component.extend({
  statemin:0,
  statemax:10,
  statefrom:0,
  stateto:10,
  classNames:["layout-row"],
  to: moment(new Date(2006,1,1)),
  from:moment(new Date(2005,1,1)),
  max: moment(new Date(2015,1,1)),
  min:moment(new Date(2000,1,1)),
  didChanged: function(variable){
    if(this.get(variable)=="date"){
      this.set("state"+variable,10);
      return;
    }
    this.set("state"+variable,this.get(variable).month()-1+(this.get(variable).year()-1900)*12);
  },
  toDidChanged: on('init',observer('to', function() {
    this.didChanged("to");
  })),
  fromDidChanged: on('init',observer('from', function() {
    this.didChanged("from");
  })),
  maxDidChanged: on('init',observer('max', function() {
    this.didChanged("max");

    this.checkBoundaries();

  })),
  minDidChanged: on('init',observer('min', function() {
    this.didChanged("min");
    this.checkBoundaries();
  })),
  checkBoundaries(){
    let error= false;
    if(this.stateto>this.statemax){
      error=true;
    }
    if(this.statefrom<this.statemin){
      error=true;
    }
    if(error||this.statefrom>this.stateto){
      this.set("statefrom",this.statemin);
      this.set("stateto",this.statemax);
    }
    schedule("afterRender",this,function(){
      this.calculate({from:this.statefrom,to:this.stateto});
    });
  },
  calculate(option) {
    this.set("state", option);
    let recalc=(pos)=>
    {
      let year = 1900 + Math.floor(option[pos] / 12);
      let month = option[pos] % 12;
      this.set(pos, moment(new Date(year, month + 1, 28)));
    }
    recalc("to");
    recalc("from");
  },
  actions: {
    calculate(option) {
      this.calculate(option);
    }
  }
});
