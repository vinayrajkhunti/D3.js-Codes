//Normal width, height

var   w = 400,
      h = 400;

//width of little circles

var circleWidth = 5;

var palette = {
      "lightgray": "#819090",
      "gray": "#708284",
      "mediumgray": "#536870",
      "darkgray": "#475B62",

      "darkblue": "#0A2933",
      "darkerblue": "#042029",

      "paleryellow": "#FCF4DC",
      "paleyellow": "#EAE3CB",
      "yellow": "#A57706",
      "orange": "#BD3613",
      "red": "#D11C24",
      "pink": "#C61C6F",
      "purple": "#595AB7",
      "blue": "#2176C7",
      "green": "#259286",
      "yellowgreen": "#738A05"
  }

//Start adding Nodes

var nodes = [
      { name: "Vinayraj Khunti"},
      { name: "HTML5/CSS3"},
      { name: "JAVASCRIPT", target: [0]},
      { name: "JQUERY", target: [0]},
      { name: "ANGULARJS", target: [1]},
      { name: "D3.JS", target: [0, 1, 2, 3]}
];

 //Links will take info. from Nodes array & separates it so we have separate length objects

var links = [];

for (var i = 0; i< nodes.length; i++) {
      if (nodes[i].target !== undefined) {
            for (var x = 0; x< nodes[i].target.length; x++ ) {
                  links.push({
                        source: nodes[i],
                        target: nodes[nodes[i].target[x]]
                  })
            }
      }
}
//Let's create some graphics now

var myChart = d3.select('#chart')
		.append('svg')
		.attr('width', w)
		.attr('height', h)

//Now making Force variable that sets Force layout
var force = d3.layout.force()
	.nodes(nodes)
	.links([])
	.gravity(0.3)
	.charge(-1000)
	.size([w, h])

//We will create a link variable here that contains info. about Links and creates lines between small circles
var link = myChart.selectAll('line')
	.data(links).enter().append('line')
	.attr('stroke', palette.gray)  // Using Palette to add color

// Create Node variable that will select small circles we will create
var node = myChart.selectAll('circle')
	.data(nodes).enter()
	.append('g')
	.call(force.drag);  //drag will allow things to animate(clickable, draggable)

//now, appending circles to nodes
node.append('circle')
	.attr('cx', function(d) { return d.x; })
	.attr('cy', function(d) { return d.y; })
	.attr('r', circleWidth )
	.attr('fill', function(d,i){
            if(i>0){ return palette.pink}
                  else{ return palette.blue}
      })

//To add text to our graphics

node.append('text')
      .text(function(d){ return d.name})
      .attr('text-anchor', function(d,i){
            if(i>0){ return 'beginning'}
                  else{ return 'end'}
      })
      .attr('x', function(d,i){
            if(i>0){ return circleWidth + 4}
                  else{ return circleWidth - 15}
      })
      .attr('y', function(d,i){
            if(i>0){ return circleWidth}
                  else{ return 7}
      })
      .attr('font-size', function(d,i){
            if(i>0){ return '1em'}
                  else{ return '1.5em'}
      })
      .attr('fill', function(d,i){
            if(i>0){ return palette.mediumgray}
                  else{ return palette.yellowgreen}
      })

//How these things get animated over time
force.on('tick', function(e) {
	node.attr('transform', function(d, i) {
		return 'translate('+ d.x +', '+ d.y +')';
	})

	link
		.attr('x1', function(d) { return d.source.x })
		.attr('y1', function(d) { return d.source.y })
		.attr('x2', function(d) { return d.target.x })
		.attr('y2', function(d) { return d.target.y })
})


force.start();

