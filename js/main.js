//var data = [25, 20, 10, 12, 15];

var svg = d3.select("#buildings").append("svg")
    .attr("width", 400)
    .attr("height", 400);

d3.json("data/buildings.json").then(function (data) {

    console.log(data);

    data.forEach((d) => {
        d.height = +d.height;
    });

    var x = d3.scaleBand()
        .domain([
            "Burj Khalifa",
            "Shanghai Tower",
            "Abraj Al-Bait Clock Tower",
            "Ping An Finance Centre",
            "Lotte World Tower",
            "Hotel de México"
        ])
        .range([0, 400])
        .paddingInner(0.3)
        .paddingOuter(0.3);

    var y = d3.scaleLinear()
        .domain([0, 828])
        .range([0, 400]);

    var rects = svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("y", 20)
        .attr("x", function (d) {
            return x(d.name)
        })
        .attr("width", x.bandwidth)
        .attr("height", function (d) {
            return y(d.height);
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