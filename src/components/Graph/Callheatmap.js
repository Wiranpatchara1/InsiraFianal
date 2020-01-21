import React, {Component} from 'react';
import $ from 'jquery';
import Heatmap from './Heatmap';

class Callheatmap extends Component {
  constructor(props) {
    super(props);
    this.state = {call: false};

}
componentDidMount(){
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


  render(){
    return(
      <div id='Heatmap'>
          {this.state.Heatmap&&<Heatmap key={"heatmap01"} data={this.state.Heatmap.Values} name={"heatmap"} />}
      </div>
  );

  }
}

export default Callheatmap;