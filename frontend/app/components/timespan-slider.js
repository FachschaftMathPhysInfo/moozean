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
  toDidChanged: on('init',observer('to', function() {
    if(this.get("to")=="date"){
      this.set("stateto",10);
      return;
    }
    this.set("stateto",this.get("to").month()-1+(this.get("to").year()-1900)*12);
  })),
  fromDidChanged: on('init',observer('from', function() {
    if(this.get("from")=="date"){
      this.set("statefrom",0);
      return;
    }
    this.set("statefrom",this.get("from").month()-1+(this.get("from").year()-1900)*12);
  })),
  maxDidChanged: on('init',observer('max', function() {
    if(this.get("max")=="date"){
      this.set("statemax",0);
      return;
    }
    this.set("statemax",this.get("max").month()-1+(this.get("max").year()-1900)*12);

    if(this.get("statefrom")>this.get("stateto")){
      this.set("statefrom",this.get("statemin"));
      this.set("stateto",this.get("statemax"));
    }
    if(this.get("statefrom")>this.get("statemax")){
      this.set("statefrom",this.get("statemin"));
      this.set("stateto",this.get("statemax"));
    }
    if(this.get("stateto")>this.get("statemax")){
      this.set("statefrom",this.get("statemin"));
      this.set("stateto",this.get("statemax"));
    }
    schedule("afterRender",this,function(){
      this.calculate({from:this.get("statefrom"),to:this.get("stateto")});
    });
  })),
  minDidChanged: on('init',observer('min', function() {
    if(this.get("min")=="date"){
      this.set("statemin",0);
      return;
    }
    this.set("statemin",this.get("min").month()-1+(this.get("min").year()-1900)*12);
    this.checkBoundaries();
    schedule("afterRender",this,function(){
      this.calculate({from:this.get("statefrom"),to:this.get("stateto")});
    });
  })),
  checkBoundaries(){
    if(this.get("statefrom")<this.get("statemin")){
      this.set("statefrom",this.get("statemin"));
      this.set("stateto",this.get("statemax"));
    }
    if(this.get("stateto")<this.get("statemin")){
      this.set("statefrom",this.get("statemin"));
      this.set("stateto",this.get("statemax"));
    }
  },
  calculate(option) {
    this.set("state", option);
    {
      let year = 1900 + Math.floor(option.to / 12);
      let month = option.to % 12;
      this.set("to", moment(new Date(year, month + 1, 28)));
    }
    {
      let year = 1900 + Math.floor(option.from / 12);
      let month = option.from % 12;
      this.set("from", moment(new Date(year, month + 1, 1)));
    }
  },
  actions: {
    calculate(option) {
      this.calculate(option);
    }
  }
});
