import React from 'react';
import $ from 'jquery';
import Correlation from './Scatter'
export default class Callscatterchart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {call: false};
 
    }
    componentDidMount(){
        const now = this;
        $.ajax({
            url: 'http://127.0.0.1:5000/data?arg1=scatter',
            type: "GET",
            dataType: 'json',
            success: function (res) {
                now.setState(state => ({
                    scatter : res
                }))
            }
        });
    }


    render(){
        return(
<<<<<<< HEAD
            <div>
=======
            <div id='scatter'>
>>>>>>> f12f5ff249ebeeb05140dfdb09c103171c2aa24a
                {this.state.scatter&&this.state.scatter.Values.map( (d,i) => {
                    var keys = Object.keys(d)[0];
                    var data = d[keys];
                    return(
<<<<<<< HEAD
                        <Correlation key={i} data={data} name={"name"} X_key={"x"} Y_key={"y"} />
=======
                        <Correlation key={i} data={data} name={keys} />
>>>>>>> f12f5ff249ebeeb05140dfdb09c103171c2aa24a
                    )
                })}
            </div>
        );
    }
}
