import React from 'react';
import $ from 'jquery';
import Linechart from './Linechart'
export default class Callbarchart extends React.Component {
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
                    line: res
                }))
            }
        });
    }


    render(){
        return(
            <div>
                {this.state.line&&this.state.line.Values.map( (d,i) => {
                    var keys = Object.keys(d)[0];
                    var data = d[keys];
                    return(
                        <Linechart key={i} data={data} name={"name"} value={"value"}  />
                    )
                })}
            </div>
            

        );
    }
}
