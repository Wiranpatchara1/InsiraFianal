import React from 'react';
import $ from 'jquery';
import Ecdf from './Ecdf'
import '../../bulma.css';

export default class Callecdf extends React.Component {
    constructor(props) {
        super(props);
        this.state = { call: false };

    }
    componentDidMount() {
        const now = this;
        $.ajax({
            url: 'http://127.0.0.1:5000/data?arg1=ecdf',
            type: "GET",
            dataType: 'json',
            success: function (res) {
                now.setState(state => ({
                    ecdf: res
                }))
            }
        });
    }


    render() {
        return (
            <div id='ecdf'>
                {this.state.ecdf && this.state.ecdf.Values.map((d, i) => {
                    var keys = Object.keys(d)[0];
                    var data = d[keys];
                    return (
                        <div className='columns is-centered'>
                            <div className='column is-9'>
                                <div id={'ecdf_' + keys} className='box'>
                                    <Ecdf key={i} data={data} name={keys} graphid={'ecdf_' + keys} />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }
}
