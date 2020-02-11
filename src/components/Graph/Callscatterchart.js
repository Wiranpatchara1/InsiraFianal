import React from 'react';
import $ from 'jquery';
import Correlation from './Scatter'
import '../../custom.scss';

export default class Callscatterchart extends React.Component {
    constructor(props) {
        super(props);
        this.state = { call: false };
        this.closeModal = this.closeModal.bind(this);

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
    closeModal(name) {
        $(name).removeClass("is-active");
    }


    render() {
        return (
            <div id='scatter'>
                {this.state.scatter && this.state.scatter.Values.map((d, i) => {
                    var keys = Object.keys(d)[0];
                    var data = d[keys];
                    return (
                        <div id={'scatter__' + i} className="modal">
                            <div class="modal-background"></div>
                            <div class="modal-content">
                                <section class="modal-card-body">
                                    <div id={'scatter_' + i} className='box'>
                                        <Correlation key={i} data={data} name={keys} graphid={'scatter_' + i} />
                                    </div>
                                    <div className='box'>
                                        <h4>{this.state.scatter.Descriptions[i][keys]}</h4>
                                    </div>
                                </section>
                            </div>
                            <button class="modal-close is-large" aria-label="close" onClick={() => this.closeModal('#scatter__' + i)}></button>
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
                                <div id={'scatter_' + i} className='box'>
                                    <Correlation key={i} data={data} name={keys} graphid={'scatter_' + i} />
                                </div>
                            </div>
                            <div className='column is-2'>
                                <div className='box'>
                                    <h4>{this.state.scatter.Descriptions[i][keys]}</h4>
                                </div>
                            </div>
                        </div>
*/