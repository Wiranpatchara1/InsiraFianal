import React from 'react';
import * as d3 from 'd3';
import { colors,margin,width,height } from '../../variables';
export default class Ecdf extends React.Component {
    constructor(props) {
        super(props);
        this.state = { call: false };

    }
    componentDidMount() {
        this.drawChart();
    }
    drawChart() {
        const { data, name,graphid } = this.props;
        const svg = d3.select("#"+graphid)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
        var max_x = d3.max(data, function (d) { return +d.xaxis })
        var min_x = d3.min(data, function (d) { return +d.xaxis })
        console.log(min_x, max_x)
        // Add X axis
        var x = d3.scaleLinear()
            .domain([min_x, max_x])
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));
        var max_y = d3.max(data, function (d) { return +d.yaxis })
        var min_y = d3.min(data, function (d) { return +d.yaxis })
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
            .attr("cx", function (d) { return x(d.xaxis); })
            .attr("cy", function (d) { return y(d.yaxis); })
            .attr("r", 3)
            .style("fill", colors.color1)

        var title = "ecdf of " + name;
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
