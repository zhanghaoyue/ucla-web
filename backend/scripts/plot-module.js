define([
	"d3"
],
function(d3){

	d3.custom = {};

	d3.custom.linePlot = function module(){

		var dispatch = d3.dispatch('markerClick','markerClickdb','mouseOver','mouseOut');

		var margin = {top:60, right:40, bottom: 40, left: 50},
			width = 1200,
			height = 720;

		var chart_svg;

		function exports (_selection){
			_selection.each(function(_data) {

				var chart_w = width - margin.left - margin.right,
					chart_h = height - margin.top -margin.bottom;

				var x = d3.scale.linear()
					.domain([0, d3.max(_data,function(d) {return d.x; })])
					.range([0, chart_w]);

				var y = d3.scale.linear()
					.domain([0, d3.max(_data,function(d) {return d.y; })])
					.range([0, chart_h]);

				maker_color_scale = d3.scale.linear().domain([d3.min(_data, function(d) {return d.x; }), d3.max(_data, function(d) {return d.x; })]).range(['violet','blue']);

				if (!chart_svg){

					chart_svg = d3.selct(this)
						.append('svg')
						.classed('chart',true)
						.attr('width',chart_w + margin.right + margin.left)
						.attr('hgeight', chart_h + margin.top + margin.bottom);

					var container = chart_svg.append('g').classed('container-group',true);
						container.append('g').classed('chart-group',true);
						container.append('g').classed('x-axis-group axis', true);
						container.append('g').classed('y-axis-group axis', true);
						container.append('g').classed('slider-group', true);
				}

				chart_svg.transition().attr({width: width, height: height});
				chart_svg.select('.container-group').attr('transform','translate('+margin.left +','+ margin.top+')')

				var line = chart_svg.select('.chart-group')
					.selectAll('.dot')
					.data(_data, function(d) { return d.id});

				line.enter()
					.append('circle')

				line.attr('class', function(d,i) {return 'dot marker-' + d.group})
					.attr('r',3)
					.style('stroke',function(d,i){
						return maker_color_scale(d.x);
					})
					.attr('fill',function(d,i){
						return maker_color_scale(d.x);
					})
					.on('click', function(d,i){
						return dispatch.markerClick(d,i);
					})
					.on('dblclick', function(d,i){
						return dispatch.markerClickdb(d, this);
					})
					.on('mouseover',function(d,i){
						return dispatch.mouseOver(d,this);
					})
					.on('mouseout',function(d,i){
						return dispatch.mouseOut(d,this);
					})
					.transition()
					.duration(500)
					.attr('cx',function(d,i){return x(d.x); })
					.attr('cy',function(d){return y(d.y); });

				line.exit().remove();

				var x_axis = d3.svg.axis().scale(x).orient('bottom');
				var y_axis = d3.svg.axis().scale(y).orient('left');

				chart_svg.selectAll('g.x-axis-group.axis')
					.transition()
					.duration(500)
					.attr('transform','translate(0,' + (chart_h) + ')')
					.call(x_axis);

				chart_svg.selectAll('g.y-axis-group.axis')
					.transition()
					.duration(500)
					.attr('transform','translate(0,0')
					.call(y_axis);

			});
		}

		exports.width = function(_x) {
			if (!arguments.length) return width;
			width =+ _x;
			return this;
		}

		exports.height = function(_x) {
			if (!arguments.length) return height;
			height =+ _x;
			return this;
		}

		d3.rebind(exports, dispatch, 'on');
		return exports;
	}

});
