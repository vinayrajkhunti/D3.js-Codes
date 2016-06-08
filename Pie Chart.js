var width = 400,
    height = 400,
    radius = 200
    colors = d3.scale.category20c();


//DATA FOR OUR CHART
var piedata = [
	{ label: "vinayraj",
	  value: 50},
	{	label: "pritesh",
		value: 50
	},
	{	label: "romal",
		value: 50
	},{	label: "rajesh",
		value: 50
	},
	{  label: "hitesh",
		value: 50
	},
	{  label: "paresh",
		value: 50
	},{ label: "tanmay",
		value: 50
	},
	{   label: "pratham",
		value: 50
	},
	{   label: "paso",
		value: 50
	}
	]
//LAYOUT OF OUR CHART

var pie = d3.layout.pie()
			.value(function(d){
				return d.value;
			})
//INNER & OUTER RANGE OF MY PIECHART

var arc = d3.svg.arc()
			.outerRadius(radius) //My shape is going to be no bigger than this

var myChart = d3.select("#chart").append("svg")
				.attr("width", width)
				.attr("height", height)
				.append("g")
				.attr('transform', 'translate('+(width - radius)+', '+(height - radius)+')')
				.selectAll('path').data(pie(piedata))
				.enter().append('g')
					.attr('class', 'slice')

var slices = d3.selectAll('g.slice')
                    .append('path')
					.attr('fill', function(d,i){
						return colors(i);
					})
					.attr('d', arc)

var text = d3.selectAll('g.slice')
			 .append('text')
			 .text(function(d,i){
			 	return d.data.label;
			 })
			 .attr('text-anchor', 'middle')
			 .attr('fill', 'white')
			 .attr('transform', function(d){
			 		d.innerRadius = 0;
			 		d.outerRadius = radius;
			 		return 'translate('+arc.centroid(d)+')'
			 })
