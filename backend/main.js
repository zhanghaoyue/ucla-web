require([
	"d3",
	'd3_timeseries',
	"dispatcher",
	"sql",
	'./scripts/data_manager',
	'./scripts/view',
	'./scripts/controller',
	'./scripts/plot-module'
], function(d3,d3_timeseries,dispatcher,data_manger,view,controller,plot-module){

	var controller_1  = controller();
	controller_1.init();
	controller_1.createView();

})