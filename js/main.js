//var data = [25, 20, 10, 12, 15];

var margin = {
    left: 100,
    right: 10,
    top: 10,
    bottom: 100
}

var width = 600 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

var svg = d3.select("#buildings")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

g.append("text")
    .attr("class", "x axis-label")
    .attr("x", width / 2)
    .attr("y", height + 100)
    .attr("font-size", "30px")
    .attr("text-anchor", "middle")
    .text("Los edificios más altos del mundo");

g.append("text")
    .attr("class", "y axis-label")
    .attr("x", - (height / 2))
    .attr("y", -60)
    .attr("font-size", "30px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Altura (m)");

d3.json("data/buildings.json").then(function (data) {

    console.log(data);

    data.forEach((d) => {
        d.height = +d.height;
    });

    var x = d3.scaleBand()
        .domain(data.map((d) => {
            return d.name
        }))
        .range([0, width])
        .paddingInner(0.3)
        .paddingOuter(0.3);

    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) {
            return d.height
        })])
        .range([height, 0]);

    var xAxisCall = d3.axisBottom(x);
    g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0, " + height + ")")
        .call(xAxisCall)
        .selectAll("text")
        .attr("y", "10")
        .attr("x", "-5")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-20)");

    var yAxisCall = d3.axisLeft(y)
        .ticks(5)
        .tickFormat(function (d) {
            return d + "m"
        });
    g.append("g")
        .attr("class", "y-axis")
        .call(yAxisCall);

    var rects = g.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("y", function (d) {
            return y(d.height);
        })
        .attr("x", function (d) {
            return x(d.name)
        })
        .attr("width", x.bandwidth)
        .attr("height", function (d) {
            return height - y(d.height);
        })
        .attr("fill", function (d) {
            return "red";
        });
});
/*
d3.tsv("data/ages.tsv").then(function (data) {
    data.forEach(function (d) {
        // Converting values to integers
        d.age = +d.age;
    });

    var svg = d3.select("#chart-area").append("svg")
        .attr("width", 400)
        .attr("height", 400);

    var circles = svg.selectAll("circle")
        .data(data);

    circles.enter()
        .append("circle")
        .attr("cx", function (d, i) {
            console.log(d);
            return (i * 50) + 25;
        })
        .attr("cy", 25)
        .attr("r", function (d) {
            return d.age * 2;
        })
        .attr("fill", function (d) {
            if (d.name == "Tony") {
                return "blue";
            }
            else {
                return "red";
            }
        });
}).catch(function (error) {
    console.log(error);
})

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