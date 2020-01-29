import React, {Component} from 'react';
// test import props
import Callhistogram from './Callhistogram';
import Callscatterchart from './Callscatterchart';
import Callbar from './Callbar';
import Callboxplot from './Callboxplot';
import Callheatmap from './Callheatmap';
import Callecdf from './Callecdf';
// import Testtable from './Testtable';
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
        <h4>&nbsp; Correlogram</h4><br />
          <Callheatmap />
        <h4>&nbsp; Distribution</h4><br />
          <Callhistogram />
        <h4>&nbsp; Correlation</h4><br />
          <Callscatterchart />
        <h4>&nbsp; Compare</h4><br />
          <Callbar />
        <h4>&nbsp; Outliner</h4><br />
          <Callboxplot />
        <h4>&nbsp; ECDF</h4><br />
          <Callecdf />
          
      </div>
  );

  }
}

export default D3Bar;