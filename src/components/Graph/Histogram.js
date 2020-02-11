import React from 'react';
import * as d3 from 'd3';
import { colors, margin, width, height } from '../../variables';
export default class Histogram extends React.Component {
  constructor(props) {
    super(props);
    this.state = { call: false };
    this.check = this.check.bind(this);

  }
  componentDidMount() {
    // console.log('from Histogram',res)

    this.drawChart();
  }
  check(e) {
    console.log("check",e)
  }

  drawChart(e) {
    const { data, name, graphid } = this.props;
    const binwidth = Math.round(Math.sqrt(data.length))
    const svg = d3.select("#" + graphid)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
    var max = d3.max(data, function (d) { return +d.value });
    var min = d3.min(data, function (d) { return +d.value });
    var x = d3.scaleLinear()
      .domain([min, max + 1])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
      .range([0, width]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
    var histogram = d3.histogram()
      .value(function (d) { return d.value; })   // I need to give the vector of value
      .domain(x.domain())  // then the domain of the graphic
      .thresholds(x.ticks(binwidth)); // then the numbers of bins

    var bins = histogram(data);
    var y = d3.scaleLinear()
      .range([height, 0]);
    y.domain([0, d3.max(bins, function (d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
    svg.append("g")
      .call(d3.axisLeft(y));

    var tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "999")
        .style("visibility", "hidden")
        .style("background-color", "whitesmoke")
        .style("color", "black")
        .style("border-radius", "5px")
        .style("padding", "10px")
        .style("opacity", .6)
    var showTooltip = function (d) {
      tooltip
        .html("Range: " + d.x0 + " - " + d.x1)
        .style("visibility", "visible");
    }
    var moveTooltip = function (d) {
      tooltip
        .style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
    }
    // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
    var hideTooltip = function (d) {
      tooltip
        .style("visibility", "hidden");
    }
    svg.selectAll("rect")
      .data(bins)
      .enter()
      .append("rect")
      .attr("x", 1)
      .attr("transform", function (d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
      .attr("width", function (d) { return x(d.x1) - x(d.x0) - 1; })
      .attr("height", function (d) { return height - y(d.length); })
      .style("fill", colors.color1)
      .on("mouseover", showTooltip )
      .on("mousemove", moveTooltip )
      .on("mouseleave", hideTooltip );

    var title = "distribution of " + name;
    svg.append("text")
      .attr("x", (width / 2))
      .attr("y", 0 - (margin.top / 2))
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("text-decoration", "underline")
      .text(title)
      


  }
  render() {
    return (null);

  }
}
