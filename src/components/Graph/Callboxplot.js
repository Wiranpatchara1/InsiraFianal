import React, { Component } from 'react';
import $ from 'jquery';
import Boxplot from './Boxplot';
import '../../bulma.css';

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
                        <div className='columns is-centered'>
                            <div className='column is-9'>
                                <div id={'boxplot_' + keys} className='box'>
                                    <Boxplot key={i} data={data} name={keys} graphid={'boxplot_' + keys} />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        );

    }

}

export default Callboxplot;