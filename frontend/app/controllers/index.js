import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
export default Controller.extend({
  paperToaster:service(),
  actions:{
    reload_lents: function(){
      this.get('model.lents').forEach((item)=>{
        item.reload().catch(()=>{
          item.unloadRecord();
        });
      });
    },
    hole_ordner: function(){
      return this.get('model.folders');
    }
  }
  });
