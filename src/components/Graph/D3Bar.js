import React, {Component} from 'react';
import Callhistogram from './Callhistogram';
import Callscatterchart from './Callscatterchart';
import Callbar from './Callbar';
import Callboxplot from './Callboxplot';
import Callheatmap from './Callheatmap';
import Callecdf from './Callecdf';
import Calllinechart from './Calllinechart';
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
        <Callheatmap />
        <Callhistogram />
        <Callscatterchart />
        {/*<h4>&nbsp; Compare</h4><br /><br />*/}
          <Callbar />
          <Callboxplot />
          <Callecdf />
        {/*<h4>&nbsp; Trend</h4><br /><br />*/}
          <Calllinechart />
          
      </div>
  );

  }
}

export default D3Bar;