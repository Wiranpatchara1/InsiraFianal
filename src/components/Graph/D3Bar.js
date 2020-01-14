import React, {Component} from 'react';
// test import props
import Callhistogram from './Callhistogram';
import Callscatterchart from './Callscatterchart';
import Callbar from './Callbar';
import Callboxplot from './Callboxplot';
import Heatmap from './Heatmap';

class D3Bar extends Component {
  constructor(props) {
    super(props);
    this.state = {call: false};

}
componentDidMount(){
    
}

  render(){
    // return <div id={"#" + this.props.id}></div>
    return(
      <div>
          <Callhistogram ></Callhistogram>

          <Callscatterchart></Callscatterchart>

          <Callbar></Callbar>

          <Callboxplot></Callboxplot>
      </div>
  );

  }
}

export default D3Bar;