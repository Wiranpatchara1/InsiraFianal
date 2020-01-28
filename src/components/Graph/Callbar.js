import React from 'react';
import $ from 'jquery';
import Bar from './ฺBar'
export default class Callbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {call: false};
 
    }
    componentDidMount(){
        const now = this;
        $.ajax({
            url: 'http://127.0.0.1:5000/data?arg1=bar_cat',
            type: "GET",
            dataType: 'json',
            success: function (res) {
                now.setState(state => ({
                    bar : res
                }))
            }
        });
    }


    render(){
        return(
            <div id='bar'>
                {this.state.bar&&this.state.bar.Values.map( (d,i) => {
                    var keys = Object.keys(d)[0];
                    var data = d[keys];
                    return(
                        <Bar key={i} data={data} name={keys} />
                    )
                })}
            </div>
        );
    }
}
