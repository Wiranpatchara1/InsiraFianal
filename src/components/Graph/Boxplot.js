import React from 'react';
import * as d3 from 'd3';
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
    const margin = { top: 30, right: 30, bottom: 30, left: 40 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
    const { data,name } = this.props;
    const svg = d3.select("#boxplot")
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
    // Show the Y scale
    var y = d3.scaleLinear()
            .domain([1.25 * min, 1.25 * max])
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
        .style("fill", "#69b3a2")
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
    
    

  }
  render() {
    return <div id={"#" + this.props.id}></div>

  }
}
