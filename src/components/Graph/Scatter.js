import React from 'react';
<<<<<<< HEAD
import * as d3 from 'd3';
import { colors,margin,width,height } from '../../variables';
export default class Correlation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { call: false };

  }
  componentDidMount() {
    this.drawChart();
  }
  drawChart() {
    const { data, name } = this.props;
    var label = name.split(",");
    const svg = d3.select("#scatter")
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
    // text label for the x axis
    svg.append("text")
      .attr("transform",
        "translate(" + (width / 2) + " ," +
        (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text(label[0]);
    console.log('label',label[0])
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
      .style("fill", colors.color1)
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(label[1]);

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
=======
import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts'
export default class Correlation extends React.Component {
  render() {
      const {data, X_key, Y_key, name} = this.props;
    return (
      <ScatterChart
        width={400}
        height={400}
        margin={{
          top: 20, right: 20, bottom: 20, left: 20,
        }}
      >
        <CartesianGrid />
        <XAxis type={"number"} dataKey={X_key} name={name}/>
        <YAxis type={"number"} dataKey={Y_key} name={name}/>
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name={name} data={data} fill="#e34345" />
      </ScatterChart>
    );
>>>>>>> Update Home
  }
}
