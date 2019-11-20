import React from 'react';
import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts'
export default class Correlation extends React.Component {
  render() {
      const {data, X_key, Y_key, name} = this.props;
    return (
      <ScatterChart
        width={400}
        height={400}
        margin={{
          top: 20, right: 20, bottom: 20, left: 20,
        }}
      >
        <CartesianGrid />
        <XAxis type={"number"} dataKey={X_key} name={name}/>
        <YAxis type={"number"} dataKey={Y_key} name={name}/>
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name={name} data={data} fill="#e34345" />
      </ScatterChart>
    );
  }
}
