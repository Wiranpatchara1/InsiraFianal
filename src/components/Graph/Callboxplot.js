import React, { Component } from 'react';
import $ from 'jquery';
import Boxplot from './Boxplot';

class Callboxplot extends Component {
    constructor(props) {
        super(props);
        this.state = { call: false };
    }
    componentDidMount() {
        const now = this;
        $.ajax({
            url: 'http://127.0.0.1:5000/data?arg1=boxplot',
            type: "GET",
            dataType: 'json',
            success: function (res) {
                now.setState(state => ({
                    Boxplot: res
                }))
            }
        }).then(
            console.log(this.state.Boxplot)
        )
    }

    render() {
        return (
            <div id='boxplot'>
                {this.state.Boxplot && this.state.Boxplot.Values.map((d, i) => {
                    var keys = Object.keys(d)[0];
                    var data = d[keys];
                    return (
                        <Boxplot key={i} data={data} name={keys} />
                    )
                })}
            </div>
        );

    }

}

export default Callboxplot;