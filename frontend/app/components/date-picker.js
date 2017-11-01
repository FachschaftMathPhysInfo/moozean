import Component from '@ember/component';
import moment from 'moment';

export default Component.extend({
  classNames:['layout-row','md-whiteframe-z1'],
  tagName:'md-datepicker',
  actions:{
    onSelect:function(date){
      this.set('visibleCalendar', !this.get('visibleCalendar'));
      this.set('date', date.moment);
    },
    fromGerman:function(value){
      this.set('date', moment(value, "DD.MM.YYYY"));
    },
    hideCalendar:function(){
    },
    formatDate:function(date){
      if(date==null){
        return "";
      }
      else{
        return moment(date).format("DD.MM.YYYY");
      }
    },
    clear:function(){
      this.set('date', null);
    }
  }
});
