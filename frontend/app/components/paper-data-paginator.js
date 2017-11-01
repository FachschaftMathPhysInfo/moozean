import { A } from '@ember/array';
import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
	tagName: 'md-table-pagination',
	classNames: ['md-table-pagination'],
	page:1,
	limitOptions:A([5,10,15]),
	limit:5,
	plural:"Berichte",
	pagesA:computed('meta.page-count','pages', function() {
		if(this.get("pages")){
			return this.get("pages");
		}
		let i=1;
		let result=[];
		for(;i<=this.get("meta.page-count");i++){
			result.push(i);
		}
		return result;
	}),
	resultsLength:computed('meta.record-count','count', function() {
		if(this.get("count")){
			return this.get("count");
		} else return this.get("meta.record-count");
	}),
	startOffset: computed('page', 'limit', 'meta',function() {

		console.log(this.get("meta"));
		return Math.max((this.get('page') - 1) * this.get('limit') + 1, 1); // 1-based index
	}),
	endOffset: computed('startOffset', 'limit', function() {
		return this.get('startOffset') + this.get('limit');
	}),
	actions: {
		increase(){
			if(this.get("page")<this.get("meta.page-count")){
				this.set("page",this.get("page")+1);
			}
		},
		decrease(){
			if(this.get("page")>1){
				this.set("page",this.get("page")-1);
			}
		}
	}
});
