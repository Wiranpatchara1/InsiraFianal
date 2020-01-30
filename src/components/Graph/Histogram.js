import React from 'react';
import * as d3 from 'd3';
import { colors,margin,width,height } from '../../variables';
export default class Histogram extends React.Component {
  constructor(props) {
    super(props);
    this.state = { call: false };

  }
  componentDidMount() {
    // console.log('from Histogram',res)

    this.drawChart();
  }
  drawChart() {
    const { data,name,graphid } = this.props;
    const binwidth = Math.round(Math.sqrt(data.length))
    const svg = d3.select("#"+graphid)
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                      "translate(" + margin.left + "," + margin.top + ")");
    var max = d3.max(data, function (d) { return +d.value });
    var min = d3.min(data, function (d) { return +d.value });
    var x = d3.scaleLinear()
              .domain([min, max+1])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
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
    svg.selectAll("rect")
        .data(bins)
        .enter()
        .append("rect")
        .attr("x", 1)
        .attr("transform", function (d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
        .attr("width", function (d) { return x(d.x1) - x(d.x0) - 1; })
        .attr("height", function (d) { return height - y(d.length); })
        .style("fill", colors.color1)
    var title = "distribution of " + name;
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
