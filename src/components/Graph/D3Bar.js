import React, {Component} from 'react';
// test import props
import $ from 'jquery';
import Histogram from './Histrogram';
import * as d3 from "d3";

class D3Bar extends Component {
  constructor(props) {
    super(props);
    this.state = {call: false};

}
componentDidMount(){
    const now = this;
    $.ajax({
        url: 'http://127.0.0.1:5000/data?arg1=distribution',
        type: "GET",
        dataType: 'json',
        success: function (res) {
            now.setState(state => ({
                Histogram: res
            }))
        }
    }).then(
      console.log(this.state.Histogram)
    )
}
  // drawChart() {
  //   const data = [12, 5, 6, 6, 9, 10];
    
  //   const svg = d3.select("body")
  //   .append("svg")
  //   .attr("width", 500)
  //   .attr("height", 800)
  //   .style("margin-left", 100);

  //   svg.selectAll("rect")
  //     .data(data)
  //     .enter()
  //     .append("rect")
  //     .attr("x", (d, i) => i * 70)
  //     .attr("y", (d, i) => 800 - 10 * d)
  //     .attr("width", 65)
  //     .attr("height", (d, i) => d * 10)
  //     .attr("fill", "green")
  // }
  render(){
    // return <div id={"#" + this.props.id}></div>
    return(
      <div>
          {this.state.Histogram&&this.state.Histogram.Values.map( (d,i) => {
              var keys = Object.keys(d)[0];
              var data = d[keys];
              return(
                  <Histogram key={i} data={data} name={keys} />
              )
          })}
      </div>
  );

  }
}

export default D3Bar;