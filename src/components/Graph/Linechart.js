import React from 'react';
import * as d3 from 'd3';
import { colors, margin, width, height } from '../../variables';
export default class Linechart extends React.Component {
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
    // var parseDate = d3.timeParse("%Y-%m-%d");
    const svg = d3.select("#" + graphid)
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");
    // Add X axis --> it is a date format
    var x = d3.scaleTime()
      .domain(d3.extent(data, function (d) { return d.x; }))
      .range([0, width]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
    // Add Y axis
    var y = d3.scaleLinear()
      .domain([d3.min(data, function (d) { return +d.y; }), d3.max(data, function (d) { return +d.y; })])
      .range([height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));
    // Add the line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", colors.color1)
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
          .x(function (d) { return x(d.x) })
          .y(function (d) { return y(d.y) })
      )
      var title = "trend of " + name
      console.log(title);
      svg.append("text")
          .attr("x", (width / 2))
          .attr("y", 0 - (margin.top / 2))
          .attr("text-anchor", "middle")
          .style("font-size", "16px")
          .style("text-decoration", "underline")
          .text(title);

  }
  render() {
    return (null);

  }
}
