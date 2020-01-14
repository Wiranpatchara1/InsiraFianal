import React from 'react';
import * as d3 from 'd3';
export default class Correlation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { call: false };

  }
  componentDidMount() {
    this.drawChart();
  }
  drawChart() {
    const margin = { top: 30, right: 30, bottom: 30, left: 40 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;
    const { data, name } = this.props;
    const svg = d3.select("body")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
    var max_x = d3.max(data, function (d) { return +d.x })
    var min_x = d3.min(data, function (d) { return +d.x })
    var x = d3.scaleLinear()
      .domain([min_x, max_x])
      .range([0, width]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
    var max_y = d3.max(data, function (d) { return +d.y })
    var min_y = d3.min(data, function (d) { return +d.y })
    // Add Y axis
    var y = d3.scaleLinear()
      .domain([min_y, max_y])
      .range([height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));
    svg.append('g')
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function (d) { return x(d.x); })
      .attr("cy", function (d) { return y(d.y); })
      .attr("r", 3)
      .style("fill", "#69b3a2")

    var title = "correlation of " + name;
    svg.append("text")
      .attr("x", (width / 2))
      .attr("y", 0 - (margin.top / 2))
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("text-decoration", "underline")
      .text(title);
  }
  render() {
    return <div id={"#" + this.props.id}></div>
  }
}
