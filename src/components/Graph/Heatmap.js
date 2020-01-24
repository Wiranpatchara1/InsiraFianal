import React from 'react';
import * as d3 from 'd3';
import { colors } from '../../variables';
export default class Heatmap extends React.Component {
    constructor(props) {
        super(props);
        this.state = { call: false };
    }
    componentDidMount() {
        this.drawChart();
    }
    drawChart() {
        // not finised 
        const margin = { top: 30, right: 30, bottom: 30, left: 40 },
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;
        // append the svg object to the body of the page
        const { data,name } = this.props;
        console.log("heatmap",data);
        var svg = d3.select("#Heatmap")
                    .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        // List of all variables and number of them
        var domain = d3.set(data.map(function (d) { return d.x })).values()
        var num = Math.sqrt(data.length)

        // Create a color scale
        var color = d3.scaleLinear()
            .domain([-1, 0, 1])
            // .range(["#fff",colors.color1]);
            .range(["#B22222", "#fff", "#000080"]);

        // Create a size scale for bubbles on top right. Watch out: must be a rootscale!
        var size = d3.scaleSqrt()
            .domain([0, 1])
            .range([0, 9]);

        // X scale
        var x = d3.scalePoint()
            .range([0, width])
            .domain(domain)

        // Y scale
        var y = d3.scalePoint()
            .range([0, height])
            .domain(domain)

        // Create one 'g' element for each cell of the correlogram
        var cor = svg.selectAll(".cor")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "cor")
            .attr("transform", function (d) {
                return "translate(" + x(d.x) + "," + y(d.y) + ")";
            });

        // Low left part + Diagonal: Add the text with specific color
        cor
            .filter(function (d) {
                var ypos = domain.indexOf(d.y);
                var xpos = domain.indexOf(d.x);
                return xpos <= ypos;
            })
            .append("text")
            .attr("y", 5)
            .text(function (d) {
                if (d.x === d.y) {
                    return d.x;
                } else {
                    return d.value.toFixed(2);
                }
            })
            .style("font-size", 11)
            .style("text-align", "center")
            .style("fill", function (d) {
                if (d.x === d.y) {
                    return "#000";
                } else {
                    return color(d.value);
                }
            });


        // Up right part: add circles
        cor
            .filter(function (d) {
                var ypos = domain.indexOf(d.y);
                var xpos = domain.indexOf(d.x);
                return xpos > ypos;
            })
            .append("circle")
            .attr("r", function (d) { return size(Math.abs(d.value)) })
            .style("fill", function (d) {
                if (d.x === d.y) {
                    return "#000";
                } else {
                    return color(d.value);
                }
            })
            .style("opacity", 0.8)

    }
    render() {
        return <div id={"#" + this.props.id}></div>
      }


}