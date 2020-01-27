import React from 'react';
import $ from 'jquery';
import Barchart from './Barchart'
import Callscatterchart from './Callscatterchart'
import Calllinechart from './Calllinechart'
import Callareachart from './Callareachart'
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
                    bar: res
                }))
                console.log("data",now.state.bar.Values[0].branch)
            }
        });
    }


    render(){
        return(
            <div>
                {this.state.bar&&this.state.bar.Values.map( (d,i) => {
                    var keys = Object.keys(d)[0];
                    var data = d[keys];
                    return(
                        <Barchart key={i} data={data} name={"name"} value={"value"} color={"#8884d8"} />
                    )
                })}
                <Callscatterchart />
                <Calllinechart  />
                <Callareachart  />
            </div>
            

        );
    }
}       
