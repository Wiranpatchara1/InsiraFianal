import React from 'react';
import $ from 'jquery';
import Ecdf from './Ecdf'
import '../../bulma.css';

export default class Callecdf extends React.Component {
    constructor(props) {
        super(props);
        this.state = { call: false };
        this.closeModal = this.closeModal.bind(this);

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
    closeModal(name) {
        $(name).removeClass("is-active");
    }



    render() {
        return (
            <div id='ecdf'>
                {this.state.ecdf && this.state.ecdf.Values.map((d, i) => {
                    var keys = Object.keys(d)[0];
                    var data = d[keys];
                    return (
                        <div id={'ecdf__' + i} class="modal">
                            <div class="modal-background"></div>
                            <div class="modal-content">
                                <section class="modal-card-body">
                                    <div id={'ecdf_' + i} className='box'>
                                        <Ecdf key={i} data={data} name={keys} graphid={'ecdf_' + i} />
                                    </div>
                                    <div className='box'>
                                        <h4>{this.state.ecdf.Descriptions[i][keys]}</h4>
                                    </div>
                                </section>
                            </div>
                            <button class="modal-close is-large" aria-label="close" onClick={() => this.closeModal('#ecdf__' + i)}></button>
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
                                <div id={'ecdf_' + i} className='box'>
                                    <Ecdf key={i} data={data} name={keys} graphid={'ecdf_' + i} />
                                </div>
                            </div>
                            <div className='column is-2'>
                                <div className='box'>
                                    <h4>{this.state.ecdf.Descriptions[i][keys]}</h4>
                                </div>
                            </div>
                        </div>
*/
