import React from 'react';
import $ from 'jquery';
import Correlation from './Scatter'
import '../../bulma.css';

export default class Callscatterchart extends React.Component {
    constructor(props) {
        super(props);
        this.state = { call: false };

    }
    componentDidMount() {
        const now = this;
        $.ajax({
            url: 'http://127.0.0.1:5000/data?arg1=scatter',
            type: "GET",
            dataType: 'json',
            success: function (res) {
                now.setState(state => ({
                    scatter: res
                }))
            }
        });
    }


<<<<<<< HEAD
    render(){
        return(
            <div id='scatter'>
                {this.state.scatter&&this.state.scatter.Values.map( (d,i) => {
                    var keys = Object.keys(d)[0];
                    var data = d[keys];
                    return(
                        <Correlation key={i} data={data} name={keys} />
=======
    render() {
        return (
            <div id='scatter'>
                {this.state.scatter && this.state.scatter.Values.map((d, i) => {
                    var keys = Object.keys(d)[0];
                    var data = d[keys];
                    var label = keys.split(",");
                    return (
                        <div className='columns is-centered'>
                            <div className='column is-9'>
                                <div id={'scatter_' + label[0] + '_' + label[1]} className='box'>
                                    <Correlation key={i} data={data} name={keys} graphid={'scatter_' + label[0] + '_' + label[1]} />
                                </div>
                            </div>
                        </div>
>>>>>>> e6b674e96544c84d9f86ce86db94bacc4efd09f9
                    )
                })}
            </div>
        );
    }
}
