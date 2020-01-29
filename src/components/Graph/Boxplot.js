import React from 'react';
import * as d3 from 'd3';
import { colors, margin, width, height } from '../../variables';
export default class Boxplot extends React.Component {
  constructor(props) {
    super(props);
    this.state = { call: false };

  }
  componentDidMount() {
    // console.log('from Histogram',res)

    this.drawChart();
  }
  drawChart() {
    const { data, name, graphid } = this.props;
    if (name === 'vitamins') {
      console.log(name, data)
    }
    const svg = d3.select("#" + graphid)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
    var title = "boxplot of " + name;
    console.log(title);
    svg.append("text")
      .attr("x", (width / 2))
      .attr("y", 0 - (margin.top / 2))
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("text-decoration", "underline")
      .text(title);
    // Compute summary statistics used for the box:
    var data_sorted = data.sort(d3.ascending)
    var q1 = d3.quantile(data_sorted, .25)
    var median = d3.quantile(data_sorted, .5)
    var q3 = d3.quantile(data_sorted, .75)
    var interQuantileRange = q3 - q1
    var min = q1 - 1.5 * interQuantileRange
    var max = q1 + 1.5 * interQuantileRange
    var realmax = d3.max(data, function (d) { return +d });
    var realmin = d3.min(data, function (d) { return +d })
    if (min < 0) min = 0;
    if (name === 'vitamins') {
      console.log(name, 'min:' + min + ',max:' + max + ',iqr:' + interQuantileRange + ',q1:' + q1 + ',q3:' + q3 + ',median:' + median + ',realmax:' + d3.max(data, function (d) { return +d }))
    }
    // Show the Y scale
    var y = d3.scaleLinear()
      .domain([1.25 * realmin, 1.25 * realmax])
      .range([height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));
    var center = 200
    var width_new = 80
    svg.append("line")
      .attr("x1", center)
      .attr("x2", center)
      .attr("y1", y(min))
      .attr("y2", y(max))
      .attr("stroke", "black")
    // Show the box
    svg
      .append("rect")
      .attr("x", center - width_new / 2)
      .attr("y", y(q3))
      .attr("height", (y(q1) - y(q3)))
      .attr("width", width_new)
      .attr("stroke", "black")
      .style("fill", colors.color1)
    svg
      .selectAll("toto")
      .data([min, median, max])
      .enter()
      .append("line")
      .attr("x1", center - width_new / 2)
      .attr("x2", center + width_new / 2)
      .attr("y1", function (d) { return (y(d)) })
      .attr("y2", function (d) { return (y(d)) })
      .attr("stroke", "black")
    var jitterWidth = 50
    svg
      .selectAll("indPoints")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function(d){return(center - jitterWidth/2 + Math.random()*jitterWidth )})
      .attr("cy", function (d) { return (y(d)) })
      .attr("r", 1.5)
      .style("fill", "white")
      .attr("stroke", "black")



  }
  render() {
    return (null);

  }
}
