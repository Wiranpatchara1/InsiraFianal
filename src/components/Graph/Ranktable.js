import React, { Component } from 'react';
import '../../bulma.css';
import $ from 'jquery';
import Loadprogress from '../Loading';

class Ranktable extends Component {
    constructor(props) {
        super(props);
        this.state = { call: false, limit: 300, loading: true };
        this.showModal = this.showModal.bind(this);
    }
    componentDidMount() {
        // const { data } = this.props;
        var now = this;
        $.ajax({
            url: 'http://127.0.0.1:5000/data',
            type: "GET",
            dataType: 'json',
            success: function (res) {
                console.log(res);
                now.setState(state => ({
                    data: res,
                    loading: false
                }));
            }
        });
        $(document).scroll(function() {
            var y = $(this).scrollTop();
            if (y > 800) {
              $('.bottomBack').fadeIn();
            } else {
              $('.bottomBack').fadeOut();
            }
          });

    }
    showModal(name) {
        console.log(name)
        $(name).addClass("is-active");
      }

    render(index) {
        return (
            <div>
            {/* test modal 
            <div class="modal">
            <div class="modal-background"></div>
            <div class="modal-card">
              <header class="modal-card-head">
                <p class="modal-card-title">TEST</p>
                <button class="delete" aria-label="close" onClick={this.closeModal}></button>
              </header>
              <section class="modal-card-body">
              </section>
              <footer class="modal-card-foot">
                  <button class="button is-success">Visualization</button>
              </footer>
            </div>
          </div>
             test modal */}
            <a style={{
                display: 'none',
                position: 'fixed',
                bottom: '10px',
                right: '10px',}} className='button bottomBack' href={'#head'} >up</a>
            {this.state.loading&&<Loadprogress />}
            <div id="head" className="columns is-centered">
                <div className="box">
                    <div className="column">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th colspan="4" style={{ textAlign: 'center' }}>Ranking Table</th>
                                </tr>
                                <tr>
                                    <th><abbr title="Ranking">Ranking</abbr></th>
                                    <th>Graph name</th>
                                    <th><abbr title="Type">Type</abbr></th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                    <th><abbr title="Ranking">Ranking</abbr></th>
                                    <th>Graph name</th>
                                    <th><abbr title="Type">Type</abbr></th>
                                    <th>Description</th>
                                </tr>
                            </tfoot>
                            <tbody>
                                {this.state.data && this.state.data.Distribution.Colnames.map((d, i) => (
                                    <tr>
                                        <th>{i + 1}</th>
                                        <td><a href={'#distribution_' + i} onClick={() => this.showModal('#distribution__' + i)}>{'การกระจายตัวของ' + this.state.data.Distribution.Colnames[i]}</a></td>
                                        <td>{'การกระจายตัว 1 ตัวแปร'}</td>
                                        <td width={this.state.limit}>{this.state.data.Distribution.Descriptions[i][this.state.data.Distribution.Colnames[i]]}</td>
                                    </tr>
                                ))}
                                {this.state.data && this.state.data.Scatter.Colnames.map((d, i) => (
                                    <tr>
                                        <th>{this.state.data.Distribution.Colnames.length + i +1}</th>
                                        <td><a href={'#scatter_' + i} onClick={() => this.showModal('#scatter__' + i)}>{'ความสัมพันธ์ระหว่าง' + this.state.data.Scatter.Colnames[i].split(",")[0] + 'และ' + this.state.data.Scatter.Colnames[i].split(",")[1]}</a></td>
                                        <td>{'ความสัมพันธ์'}</td>
                                        <td width={this.state.limit}>{this.state.data.Scatter.Descriptions[i][this.state.data.Scatter.Colnames[i]]}</td>
                                    </tr>
                                ))}
                                {this.state.data && this.state.data.Boxplot.Colnames.map((d, i) => (
                                    <tr>
                                        <th>{this.state.data.Scatter.Colnames.length + this.state.data.Distribution.Colnames.length + i +1}</th>
                                        <td><a href={'#boxplot_' + i} onClick={() => this.showModal('#boxplot__' + i)}>{'ค่าเฉลี่ยและการแปรผันของ' + this.state.data.Boxplot.Colnames[i]}</a></td>
                                        <td>{'การกระจายตัวของกลุ่ม'}</td>
                                        <td width={this.state.limit}>{this.state.data.Boxplot.Descriptions[i][this.state.data.Boxplot.Colnames[i]]}</td>
                                    </tr>
                                ))}
                                {this.state.data && this.state.data.Bar_cat.Colnames.map((d, i) => (
                                    <tr>
                                        <th>{this.state.data.Boxplot.Colnames.length + this.state.data.Scatter.Colnames.length + this.state.data.Distribution.Colnames.length + i +1}</th>
                                        <td><a href={'#bar_' + i}>{'เปรียบเทียบปริมาณของ' + this.state.data.Bar_cat.Colnames[i]}</a></td>
                                        <td>{'เปรียบเทียบปริมาณ'}</td>
                                        <td width={this.state.limit}>{this.state.data.Bar_cat.Descriptions[i][this.state.data.Bar_cat.Colnames[i]]}</td>
                                    </tr>
                                ))}
                                {this.state.data && this.state.data.Ecdf.Colnames.map((d, i) => (
                                    <tr>
                                        <th>{this.state.data.Bar_cat.Colnames.length + this.state.data.Boxplot.Colnames.length + this.state.data.Scatter.Colnames.length + this.state.data.Distribution.Colnames.length + i +1}</th>
                                        <td><a href={'#ecdf_' + i} onClick={() => this.showModal('#ecdf__' + i)}>{'การแจกแจงสะสมเชิงประจักษ์ของ' + this.state.data.Ecdf.Colnames[i]}</a></td>
                                        <td>{'Empirical distribution function'}</td>
                                        <td width={this.state.limit}>{this.state.data.Ecdf.Descriptions[i][this.state.data.Ecdf.Colnames[i]]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            </div>
            
        );

    }
}

export default Ranktable;