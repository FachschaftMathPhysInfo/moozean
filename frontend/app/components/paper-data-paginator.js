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
		if(this.pages){
			return this.pages;
		}
		let i=1;
		let result=[];
		for(;i<=this.get("meta.page-count");i++){
			result.push(i);
		}
		return result;
	}),
	resultsLength:computed('meta.record-count','count', function() {
		if(this.count){
			return this.count;
		} else return this.get("meta.record-count");
	}),
	startOffset: computed('page', 'limit', 'meta',function() {
		return Math.max((this.page - 1) * this.limit + 1, 1); // 1-based index
	}),
	endOffset: computed('startOffset', 'limit', function() {
		return this.startOffset + this.limit;
	}),
	actions: {
		resetPage(){
			this.set('page',1);
		},
		increase(){
			if(this.page<this.get("meta.page-count")){
				this.set("page",this.page+1);
			}
		},
		decrease(){
			if(this.page>1){
				this.set("page",this.page-1);
			}
		}
	}
});
