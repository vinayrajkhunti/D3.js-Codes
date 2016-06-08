//ASCENDING ORGANIZING BARDATA SORTING
var bardata = [];

for(var i = 0; i < 50; i++)
{
	bardata.push(Math.random()*30);
}
bardata.sort(function compareNumbers(a,b){
	return a - b;
})

var margin = {top:30, right:30, bottom:40, left:50}
var height = 400 - margin.top - margin.bottom,
	width = 600 - margin.left - margin.right,
	barWidth = 50,
	barOffset = 5;

var tempColor;

var colors = d3.scale.linear()
			//.domain([0, d3.max(bardata)]) //To change Color hightwise
			.domain([0, bardata.length])  //To change color left to right
			.range(['#FFB832', '#C61C6F'])

var yScale = d3.scale.linear()
			.domain([0, d3.max(bardata)])
			.range([0, height])

var xScale = d3.scale.ordinal()
			.domain(d3.range(0, bardata.length))
			.rangeBands([0, width], .1) //Padding and room between bars

var tooltip = d3.select('body').append('div')
		.style('position', 'absolute')
		.style('padding', '0 10px')
		.style('background', 'white')
		.style('opacity', 0)

var myChart = d3.select('#chart')
.append('svg')
    .style('background', '#E7E0CB')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
	.append('g')  // Appending G(Group element) out of SVG
	.attr('transform', 'translate('+ margin.left +','+ margin.top +' )')
	.style('background', '#C9D7D6')
	.selectAll('rect').data(bardata)
	.enter().append('rect')
		//.style('fill', colors)        //To change Color hightwise
		.style('fill', function(d,i)    //To change color left to right
		{
			return colors(i);
		})
		.attr('width', xScale.rangeBand())
		
		.attr('x', function(d, i)
		{
			return xScale(i);
		})
		.attr('height', 0)
		.attr('y', height)
		.on('mouseover', function(d){

			tooltip.transition()
				.style('opacity', 0.9)
			tooltip.html(d)
				.style('left', (d3.event.pageX) + 'px')
				.style('top', (d3.event.pageY) + 'px')

			tempColor = this.style.fill;
			d3.select(this)
				.style('opacity', 0.5)
				.style('fill', 'yellow')
		})
		.on('mouseout', function(d){
			d3.select(this)
				.style('opacity', 1)
				.style('fill', tempColor)
		})

myChart.transition()
		.attr('height', function(d)
		{
			return yScale(d);
		})
		.attr('y', function(d)
		{
			return height - yScale(d);
		})
		.delay(function(d,i){
			return i * 20;
		})
		.duration(1000)
		.ease('elastic')

var vGuideScale = d3.scale.linear()
					.domain([0, d3.max(bardata)])
					.range([height, 0])
//vAxis will hold information about numbers
var vAxis = d3.svg.axis()
				.scale(vGuideScale)
				.orient('left')   // Oriantation. This would be the alignment of the scale. Where we want it to go (left, right, top, bottom)
				.ticks(10)           // Specifying no. of Tickmarks we want to add here.   

var vGuide = d3.select('svg').append('g') //Var to create element in existing chart.
			   
			   vAxis(vGuide)

			   vGuide.attr('transform', 'translate('+ margin.left +','+ margin.top +')')
			   vGuide.selectAll('path')
			   		  .style({fill:'none', stroke: '#000'})
               vGuide.selectAll('line')
			   		  .style({stroke: '#000'})
var hAxis = d3.svg.axis()
				.scale(xScale)
				.orient('bottom')
				.tickValues(xScale.domain().filter(function(d,i){
					return !(i % (bardata.length/5));
				}))
var hGuide = d3.select('svg').append('g') //Var to create element in existing chart.
			   
			   hAxis(hGuide)

			   hGuide.attr('transform', 'translate('+ margin.left +','+ (height + margin.top) +')')
			   hGuide.selectAll('path')
			   		  .style({fill:'none', stroke: '#000'})
               hGuide.selectAll('line')
			   		  .style({stroke: '#000'})
