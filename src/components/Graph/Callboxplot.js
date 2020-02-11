import React, { Component } from 'react';
import $ from 'jquery';
import Boxplot from './Boxplot';
import '../../bulma.css';

class Callboxplot extends Component {
    constructor(props) {
        super(props);
        this.state = { call: false };
        this.closeModal = this.closeModal.bind(this);
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
    closeModal(name) {
        $(name).removeClass("is-active");
    }

    render() {
        return (
            <div id='boxplot'>
                {this.state.Boxplot && this.state.Boxplot.Values.map((d, i) => {
                    var keys = Object.keys(d)[0];
                    var data = d[keys];
                    return (
                        <div id={'boxplot__' + i} className="modal">
                            <div class="modal-background"></div>
                            <div class="modal-content">
                                <section class="modal-card-body">
                                    <div id={'boxplot_' + i} className='box'>
                                        <Boxplot key={i} data={data} name={keys} graphid={'boxplot_' + i} />
                                    </div>
                                    <div className='box'>
                                        <h4>{this.state.Boxplot.Descriptions[i][keys]}</h4>
                                    </div>
                                </section>
                            </div>
                            <button class="modal-close is-large" aria-label="close" onClick={() => this.closeModal('#boxplot__' + i)}></button>
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
                                <div id={'boxplot_' + i} className='box'>
                                    <Boxplot key={i} data={data} name={keys} graphid={'boxplot_' + i} />
                                </div>
                            </div>
                            <div className='column is-2'>
                                <div className='box'>
                                    <h4>{this.state.Boxplot.Descriptions[i][keys]}</h4>
                                </div>
                            </div>
                        </div>
*/
export default Callboxplot;