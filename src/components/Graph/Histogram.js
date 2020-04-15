import React from 'react';
import * as d3 from 'd3';
import $ from 'jquery';
import { colors, margin, width, height } from '../../variables';
import * as d3annotation from 'd3-svg-annotation';
import './annotationstyle.css';
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
    console.log("check", e)
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
    var max = d3.max(data, (d) => { return +d.value });
    var min = d3.min(data, (d) => { return +d.value });
    var mean = d3.min(data, (d) => { return +d.value });
    var x = d3.scaleLinear()
      .domain([min, max + 1])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
      .range([0, width]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
    var y = d3.scaleLinear()
      .range([height, 0]);
    var yAxis = svg.append("g")
    function update(nbin) {
      var histogram = d3.histogram()
        .value(function (d) { return d.value; })   // I need to give the vector of value
        .domain(x.domain())  // then the domain of the graphic
        .thresholds(x.ticks(nbin)); // then the numbers of bins

      var bins = histogram(data);

      y.domain([0, d3.max(bins, (d) => { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
      yAxis
        .transition()
        .duration(1000)
        .call(d3.axisLeft(y));

      var tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "100")
        .style("visibility", "hidden")
        .style("background-color", "whitesmoke")
        .style("color", "black")
        .style("border-radius", "5px")
        .style("padding", "10px")
        .style("opacity", .6)
      var showTooltip = (d) => {
        tooltip
          .html("Range: " + d.x0 + " - " + d.x1)
          .style("visibility", "visible");
      }
      var moveTooltip = (d) => {
        tooltip
          .style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
      }
      // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
      var hideTooltip = (d) => {
        tooltip
          .style("visibility", "hidden");
      }
      // Join the rect with the bins data
      var u = svg.selectAll("rect")
        .data(bins)

      // Manage the existing bars and eventually the new ones:
      u
        .enter()
        .append("rect") // Add a new rect for each new elements
        .merge(u) // get the already existing elements as well
        .transition() // and apply changes to all of them
        .duration(1000)
        .attr("x", 1)
        .attr("transform", (d) => { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
        .attr("width", (d) => { return x(d.x1) - x(d.x0) - 1; })
        .attr("height", (d) => { return height - y(d.length); })
        .style("fill", colors.color1)
      // .on("mouseover", showTooltip)
      // .on("mousemove", moveTooltip)
      // .on("mouseleave", hideTooltip);



      // If less bar in the new histogram, I delete the ones not in use anymore
      u
        .exit()
        .remove()
      svg.selectAll("rect")
        .on("mouseover", showTooltip)
        .on("mousemove", moveTooltip)
        .on("mouseleave", hideTooltip);

      // svg.selectAll("rect")
      //   .data(bins)
      //   .enter()
      //   .append("rect")
      //   .attr("x", 1)
      //   .attr("transform", function (d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
      //   .attr("width", function (d) { return x(d.x1) - x(d.x0) - 1; })
      //   .attr("height", function (d) { return height - y(d.length); })
      //   .style("fill", colors.color1)
      //   .on("mouseover", showTooltip)
      //   .on("mousemove", moveTooltip)
      //   .on("mouseleave", hideTooltip);

      var title = "distribution of " + name;
      svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text(title)
      // var annotations = [
      //   {
      //     //below in makeAnnotations has type set to d3.annotationLabel
      //     //you can add this type value below to override that default
      //     note: { title: "median" },
      //     subject: {
      //       y1: margin.top,
      //       y2: height
      //     },
      //     x: x((max-mean)/2),
      //     y: margin.top,
      //   },
      //   {
      //     note: { title: "min" },
      //     subject: {
      //       y1: margin.top,
      //       y2: height
      //     },
      //     x: x(min),
      //     y: margin.top,
      //   },
      //   {
      //     note: { title: "max" },
      //     subject: {
      //       y1: margin.top,
      //       y2: height
      //     },
      //     x: x(max),
      //     y: margin.top,
      //   }
      // ]

      // var type = d3annotation.annotationCustomType(
      //   d3annotation.annotationXYThreshold,
      //   {
      //     "note": {
      //       "lineType": "none",
      //       "orientation": "top",
      //       "align": "middle"
      //     }
      //   }
      // )
      // var makeAnnotations = d3annotation.annotation()
      //   .type(type)
      //   //Gives you access to any data objects in the annotations array
      //   .accessors({
      //     x: function (d) { return x(d.x) },
      //     y: function (d) { return y(d.y) }
      //   })
      //   .annotations(annotations)
      //   .textWrap(30)

      // var a = svg.selectAll(".annotation-group")

      // a
      //   .enter()
      //   .append("g")
      //   .merge(a)
      //   .attr("class", "annotation-group")
      //   .style("position", "absolute")
      //   .style("z-index", "100")
      //   .call(makeAnnotations)
      // a
      //   .exit()
      //   .remove()
    }
    function updateTextInput(value) {
      $("#textInput" + graphid).text(value);
    }
    $("#" + graphid).append(`<p>
                    <label># bins</label>
                      <input type="range" min="1" max="100" step="2" value="`+ binwidth + `" id="nBin` + graphid + `"><br>
                    <label id="textInput`+ graphid + `" >` + binwidth + `</label>
                  </p>`)
    update(binwidth);
    d3.select("#nBin" + graphid).on("input", function () {
      update(+this.value);
      updateTextInput(+this.value);
    });
    var annotations = [
      {
        //below in makeAnnotations has type set to d3.annotationLabel
        //you can add this type value below to override that default
        note: { title: "median" },
        subject: {
          y1: margin.top,
          y2: height
        },
        x: x((max - mean) / 2),
        y: margin.top,
      },
      {
        note: { title: "min" },
        subject: {
          y1: margin.top,
          y2: height
        },
        x: x(min),
        y: margin.top,
      },
      {
        note: { title: "max" },
        subject: {
          y1: margin.top,
          y2: height
        },
        x: x(max),
        y: margin.top,
      }
    ]
    var type = d3annotation.annotationCustomType(
      d3annotation.annotationXYThreshold,
      {
        "note": {
          "lineType": "none",
          "orientation": "top",
          "align": "middle"
        }
      }
    )
    var makeAnnotations = d3annotation.annotation()
      .type(type)
      //Gives you access to any data objects in the annotations array
      .accessors({
        x: function (d) { return x(d.x) },
        y: function (d) { return y(d.y) }
      })
      .annotations(annotations)
      .textWrap(30)

    svg
      .append("g")
      .attr("class", "annotation-group")
      .call(makeAnnotations)




  }
  render() {
    return (null);

  }
}
