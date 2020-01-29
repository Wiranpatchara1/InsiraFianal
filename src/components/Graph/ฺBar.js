import React from 'react';
import * as d3 from 'd3';
import { colors,margin,width,height } from '../../variables';
export default class Bar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { call: false };

  }
  componentDidMount() {
    // console.log('from Histogram',res)

    this.drawChart();
  }
  drawChart() {
    const { data,name } = this.props;
    console.log("From Bar ",data);
    const svg = d3.select("#bar")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");
    var x = d3.scaleBand()
            .range([0, width])
            .domain(data.map(function (d) { return d.name; }))
            .padding(0.2);
    svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");
    var max_x = d3.max(data, function (d) { return +d.value })
    // var min_x = d3.min(data, function (d) { return +d.value })
    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 1.25 * max_x])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));
    svg.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) { return x(d.name); })
        .attr("y", function (d) { return y(d.value); })
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return height - y(d.value); })
        .attr("fill", colors.color1)
    var title = "barplot of " + name;
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
    return <div id={"#" + this.props.id}></div>

  }
  
}
