import React, { Component } from 'react';
import $ from 'jquery';
import Heatmap from './Heatmap';
import '../../bulma.css';

class Callheatmap extends Component {
  constructor(props) {
    super(props);
    this.state = { call: false };

  }
  componentDidMount() {
    const now = this;
    $.ajax({
      url: 'http://127.0.0.1:5000/data?arg1=heatmap',
      type: "GET",
      dataType: 'json',
      success: function (res) {
        now.setState(state => ({
          Heatmap: res
        }))
      }
    }).then(
      console.log(this.state.Heatmap)
    )
  }


  render() {
    return (
      
        <div className='columns is-centered'>
          <div className='column is-9'>
          {this.state.Heatmap && 
            <div id='Heatmap' className='box'>
              <h4>&nbsp; Correlogram</h4><br /><br />
              {this.state.Heatmap && <Heatmap key={"heatmap01"} data={this.state.Heatmap.Values} name={"heatmap"} />}
            </div>
          }
          </div>
        </div>
    );

  }
}

export default Callheatmap;