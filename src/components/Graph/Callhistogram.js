import React, {Component} from 'react';
import $ from 'jquery';
import Histogram from './Histogram';

class Callhistogram extends Component {
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


  render(){
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

export default Callhistogram;