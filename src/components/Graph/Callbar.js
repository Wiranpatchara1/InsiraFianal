import React from 'react';
import $ from 'jquery';
import Bar from './ฺBar'
import '../../bulma.css';

export default class Callbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { call: false };

    }
    componentDidMount() {
        const now = this;
        $.ajax({
            url: 'http://127.0.0.1:5000/data?arg1=bar_cat',
            type: "GET",
            dataType: 'json',
            success: function (res) {
                now.setState(state => ({
                    bar: res
                }))
            }
        });
    }


    render() {
        return (
            <div id='bar'>
                {this.state.bar && this.state.bar.Values.map((d, i) => {
                    var keys = Object.keys(d)[0];
                    var data = d[keys];
                    return (
                        <div className='columns is-centered'>
                            <div className='column is-9'>
                                <div id={'bar_' + i} className='box'>
                                    <Bar key={i} data={data} name={keys} graphid={'bar_' + i} />
                                </div>
                            </div>
                            <div className='column is-2'>
                                <div className='box'>
                                    <h4>{this.state.bar.Descriptions[i][keys]}</h4>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }
}
