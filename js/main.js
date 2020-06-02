var data = [25, 20, 10, 12, 15];

var svg = d3.select("#chart-area").append("svg")
    .attr("width", 400)
    .attr("height", 400);

var circles = svg.selectAll("circle")
    .data(data);

circles.enter()
    .append("circle")
    .attr("cx", (d, i) => {
        return (i * 50) + 25;
    })
    .attr("cy", 30)
    .attr("r", (d) => {
        return 25;
    })
    .attr("fill", "red");

/*
var circle = svg.append("circle")
.attr("cx", 200)
.attr("cy", 200)
.attr("r", 100)
.attr("fill", "gray");

var rectangle = svg.append("rect")
.attr("x", 0)
.attr("y", 0)
.attr("width", 200)
.attr("height", 200)
.attr("fill", "red");
*/