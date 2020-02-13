import React from 'react';
import $ from 'jquery';
import * as d3 from 'd3';
import Linechart from './Linechart'
export default class Calllinechart extends React.Component {
    constructor(props) {
        super(props);
        this.state = { call: false };
        this.closeModal = this.closeModal.bind(this);

    }
    componentDidMount() {
        const now = this;
        $.ajax({
            url: 'http://127.0.0.1:5000/data?arg1=time',
            type: "GET",
            dataType: 'json',
            success: function (res) {
                now.setState(state => ({
                    time: res
                }))
            }
        });
    }
    closeModal(name) {
        $(name).removeClass("is-active");
      }


    render() {
        return (
            <div id='time'>
                {this.state.time && this.state.time.Values.map((d, i) => {
                    var keys = Object.keys(d)[0];
                    var data = d[keys];
                    var parseDate = d3.timeParse("%Y-%m-%d");
                    data.forEach(function (d) {
                        // console.log("ee",d['x'],parseDate(d['x']));
                        d['x'] = parseDate(d['x']);
                    });
                    console.log(data)
                    return (
                        <div id={'time__' + i} class="modal">
                            <div class="modal-background"></div>
                            <div class="modal-content">
                                <section class="modal-card-body">
                                    <div id={'time_' + i} className='box'>
                                        <Linechart key={i} data={data} name={keys} graphid={'time_' + i} />
                                    </div>
                                    <div className='box'>
                                        <h4>{this.state.time.Descriptions[i][keys]}</h4>
                                    </div>
                                </section>
                            </div>
                            <button class="modal-close is-large" aria-label="close" onClick={() => this.closeModal('#time__' + i)}></button>
                        </div>
                    )
                })}
            </div>


        );
    }
}
/*
<div className='columns is-centered'>
                            <div className='column is-9'>
                                <div id={'time_' + i} className='box'>
                                    <Linechart key={i} data={data} name={keys} graphid={'time_' + i} />
                                </div>
                            </div>
                            <div className='column is-2'>
                                <div className='box'>
                                    <h4>{this.state.time.Descriptions[i][keys]}</h4>
                                </div>
                            </div>
                        </div>
*/