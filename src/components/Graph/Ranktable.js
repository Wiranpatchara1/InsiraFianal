import React, { Component } from 'react';
import '../../bulma.css';
import $ from 'jquery';


class Ranktable extends Component {
    constructor(props) {
        super(props);
        this.state = { call: false,limit: 300 };
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
                    data: res
                }));
            }
        });

    }

    render() {
        // return <div id={"#" + this.props.id}></div>
        return (
            <div className="columns is-centered">
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
                                    <td>{this.state.data.Distribution.Colnames[i]}</td>
                                    <td>{'การกระจายตัว 1 ตัวแปร'}</td>
                                    <td width={this.state.limit}>{this.state.data.Distribution.Descriptions[i][this.state.data.Distribution.Colnames[i]]}</td>
                                </tr>
                            ))}
                            {this.state.data && this.state.data.Scatter.Colnames.map((d, i) => (
                                <tr>
                                    <th>{i + 1}</th>
                                    <td>{this.state.data.Scatter.Colnames[i]}</td>
                                    <td>{'ความสัมพันธ์'}</td>
                                    <td width={this.state.limit}>{this.state.data.Scatter.Descriptions[i][this.state.data.Scatter.Colnames[i]]}</td>
                                </tr>
                            ))}
                            {this.state.data && this.state.data.Boxplot.Colnames.map((d, i) => (
                                <tr>
                                    <th>{i + 1}</th>
                                    <td>{this.state.data.Boxplot.Colnames[i]}</td>
                                    <td>{'การกระจายตัวของกลุ่ม'}</td>
                                    <td width={this.state.limit}>{this.state.data.Boxplot.Descriptions[i][this.state.data.Boxplot.Colnames[i]]}</td>
                                </tr>
                            ))}
                            {this.state.data && this.state.data.Bar_cat.Colnames.map((d, i) => (
                                <tr>
                                    <th>{i + 1}</th>
                                    <td>{this.state.data.Bar_cat.Colnames[i]}</td>
                                    <td>{'เปรียบเทียบปริมาณ'}</td>
                                    <td width={this.state.limit}>{this.state.data.Bar_cat.Descriptions[i][this.state.data.Bar_cat.Colnames[i]]}</td>
                                </tr>
                            ))}
                            {this.state.data && this.state.data.Ecdf.Colnames.map((d, i) => (
                                <tr>
                                    <th>{i + 1}</th>
                                    <td>{this.state.data.Ecdf.Colnames[i]}</td>
                                    <td>{'Empirical distribution function'}</td>
                                    <td width={this.state.limit}>{this.state.data.Ecdf.Descriptions[i][this.state.data.Ecdf.Colnames[i]]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        );

    }
}

export default Ranktable;