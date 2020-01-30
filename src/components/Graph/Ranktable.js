import React, { Component } from 'react';
import '../../bulma.css';
import $ from 'jquery';
import Loadprogress from '../Loading';

class Ranktable extends Component {
<<<<<<< HEAD
  constructor(props) {
    super(props);
    this.state = { call: false};
  }
  componentDidMount() {
    //const { data } = this.props;
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
=======
    constructor(props) {
        super(props);
        this.state = { call: false, limit: 300, loading: true };
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
>>>>>>> e6b674e96544c84d9f86ce86db94bacc4efd09f9

    }

<<<<<<< HEAD
  render() {
    // return <div id={"#" + this.props.id}></div>
    return (
        <div class="columns is-centered">
        <table class="table">
            <thead>
                <tr>
                    <th  colspan="4" style={{textAlign:'center'}}>Ranking Table</th>
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
                {this.state.data&&this.state.data.Distribution.Colnames.map((d,i) => (
                    <tr>
                        <th>{i+1}</th>
                        <td>{this.state.data.Distribution.Colnames[i]}</td>
                        <td>{'การกระจายตัว 1 ตัวแปร'}</td>
                        <td>{this.state.data.Distribution.Descriptions[i][this.state.data.Distribution.Colnames[i]]}</td>
                    </tr>
                ))}
                {this.state.data&&this.state.data.Scatter.Colnames.map((d,i) => (
                    <tr>
                        <th>{i+1}</th>
                        <td>{this.state.data.Scatter.Colnames[i]}</td>
                        <td>{'ความสัมพันธ์'}</td>
                        <td>{this.state.data.Scatter.Descriptions[i][this.state.data.Scatter.Colnames[i]]}</td>
                    </tr>
                ))}
                {this.state.data&&this.state.data.Boxplot.Colnames.map((d,i) => (
                    <tr>
                        <th>{i+1}</th>
                        <td>{this.state.data.Boxplot.Colnames[i]}</td>
                        <td>{'การกระจายตัวของกลุ่ม'}</td>
                        <td>{this.state.data.Boxplot.Descriptions[i][this.state.data.Boxplot.Colnames[i]]}</td>
                    </tr>
                ))}
                {this.state.data&&this.state.data.Bar_cat.Colnames.map((d,i) => (
                    <tr>
                        <th>{i+1}</th>
                        <td>{this.state.data.Bar_cat.Colnames[i]}</td>
                        <td>{'เปรียบเทียบปริมาณ'}</td>
                        <td>{this.state.data.Bar_cat.Descriptions[i][this.state.data.Bar_cat.Colnames[i]]}</td>
                    </tr>
                ))}
                {this.state.data&&this.state.data.Ecdf.Colnames.map((d,i) => (
                    <tr>
                        <th>{i+1}</th>
                        <td>{this.state.data.Ecdf.Colnames[i]}</td>
                        <td>{'Empirical distribution function'}</td>
                        <td>{this.state.data.Ecdf.Descriptions[i][this.state.data.Ecdf.Colnames[i]]}</td>
                    </tr>
                ))}
                {/*<tr>
                    <th>1</th>
                    <td><a href="https://en.wikipedia.org/wiki/Leicester_City_F.C." title="Leicester City F.C.">Leicester City</a> <strong>(C)</strong>
                    </td>
                    <td>38</td>
                    <td>Qualification for the <a href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Champions_League#Group_stage" title="2016–17 UEFA Champions League">Champions League group stage</a></td>
                </tr>
                <tr>
                    <th>2</th>
                    <td><a href="https://en.wikipedia.org/wiki/Arsenal_F.C." title="Arsenal F.C.">Arsenal</a></td>
                    <td>38</td>
                    <td>Qualification for the <a href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Champions_League#Group_stage" title="2016–17 UEFA Champions League">Champions League group stage</a></td>
                </tr>
                <tr>
                    <th>3</th>
                    <td><a href="https://en.wikipedia.org/wiki/Tottenham_Hotspur_F.C." title="Tottenham Hotspur F.C.">Tottenham Hotspur</a></td>
                    <td>38</td>
                    <td>Qualification for the <a href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Champions_League#Group_stage" title="2016–17 UEFA Champions League">Champions League group stage</a></td>
                </tr>
                <tr>
                    <th>4</th>
                    <td><a href="https://en.wikipedia.org/wiki/Manchester_City_F.C." title="Manchester City F.C.">Manchester City</a></td>
                    <td>38</td>
                    <td>Qualification for the <a href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Champions_League#Play-off_round" title="2016–17 UEFA Champions League">Champions League play-off round</a></td>
                </tr>
                <tr>
                    <th>5</th>
                    <td><a href="https://en.wikipedia.org/wiki/Manchester_United_F.C." title="Manchester United F.C.">Manchester United</a></td>
                    <td>38</td>
                    <td>Qualification for the <a href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Europa_League#Group_stage" title="2016–17 UEFA Europa League">Europa League group stage</a></td>
                </tr>
                <tr>
                    <th>6</th>
                    <td><a href="https://en.wikipedia.org/wiki/Southampton_F.C." title="Southampton F.C.">Southampton</a></td>
                    <td>38</td>
                    <td>Qualification for the <a href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Europa_League#Group_stage" title="2016–17 UEFA Europa League">Europa League group stage</a></td>
                </tr>
                <tr>
                    <th>7</th>
                    <td><a href="https://en.wikipedia.org/wiki/West_Ham_United_F.C." title="West Ham United F.C.">West Ham United</a></td>
                    <td>38</td>
                    <td>Qualification for the <a href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Europa_League#Third_qualifying_round" title="2016–17 UEFA Europa League">Europa League third qualifying round</a></td>
                </tr>*/}
            </tbody>
        </table>
    </div>
    );
=======
    render(index) {
        return (
            <div>
            <button style={{
                display: 'none',
                position: 'fixed',
                bottom: '10px',
                right: '10px',}} className='button bottomBack'>
                <a href={'#head'} >up</a>
            </button>
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
                                        <td><a href={'#distribution_' + this.state.data.Distribution.Colnames[i]}>{'การกระจายตัวของ' + this.state.data.Distribution.Colnames[i]}</a></td>
                                        <td>{'การกระจายตัว 1 ตัวแปร'}</td>
                                        <td width={this.state.limit}>{this.state.data.Distribution.Descriptions[i][this.state.data.Distribution.Colnames[i]]}</td>
                                    </tr>
                                ))}
                                {this.state.data && this.state.data.Scatter.Colnames.map((d, i) => (
                                    <tr>
                                        <th>{this.state.data.Distribution.Colnames.length + i +1}</th>
                                        <td><a href={'#scatter_' + this.state.data.Scatter.Colnames[i].split(",")[0] + '_' + this.state.data.Scatter.Colnames[i].split(",")[1]}>{'ความสัมพันธ์ระหว่าง' + this.state.data.Scatter.Colnames[i].split(",")[0] + 'และ' + this.state.data.Scatter.Colnames[i].split(",")[1]}</a></td>
                                        <td>{'ความสัมพันธ์'}</td>
                                        <td width={this.state.limit}>{this.state.data.Scatter.Descriptions[i][this.state.data.Scatter.Colnames[i]]}</td>
                                    </tr>
                                ))}
                                {this.state.data && this.state.data.Boxplot.Colnames.map((d, i) => (
                                    <tr>
                                        <th>{this.state.data.Scatter.Colnames.length + this.state.data.Distribution.Colnames.length + i +1}</th>
                                        <td><a href={'#boxplot_' + this.state.data.Boxplot.Colnames[i]}>{'ค่าเฉลี่ยและการแปรผันของ' + this.state.data.Boxplot.Colnames[i]}</a></td>
                                        <td>{'การกระจายตัวของกลุ่ม'}</td>
                                        <td width={this.state.limit}>{this.state.data.Boxplot.Descriptions[i][this.state.data.Boxplot.Colnames[i]]}</td>
                                    </tr>
                                ))}
                                {this.state.data && this.state.data.Bar_cat.Colnames.map((d, i) => (
                                    <tr>
                                        <th>{this.state.data.Boxplot.Colnames.length + this.state.data.Scatter.Colnames.length + this.state.data.Distribution.Colnames.length + i +1}</th>
                                        <td><a href={'#bar_' + this.state.data.Bar_cat.Colnames[i]}>{'เปรียบเทียบปริมาณของ' + this.state.data.Bar_cat.Colnames[i]}</a></td>
                                        <td>{'เปรียบเทียบปริมาณ'}</td>
                                        <td width={this.state.limit}>{this.state.data.Bar_cat.Descriptions[i][this.state.data.Bar_cat.Colnames[i]]}</td>
                                    </tr>
                                ))}
                                {this.state.data && this.state.data.Ecdf.Colnames.map((d, i) => (
                                    <tr>
                                        <th>{this.state.data.Bar_cat.Colnames.length + this.state.data.Boxplot.Colnames.length + this.state.data.Scatter.Colnames.length + this.state.data.Distribution.Colnames.length + i +1}</th>
                                        <td><a href={'#ecdf_' + this.state.data.Ecdf.Colnames[i]}>{'การแจกแจงสะสมเชิงประจักษ์ของ' + this.state.data.Ecdf.Colnames[i]}</a></td>
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
>>>>>>> e6b674e96544c84d9f86ce86db94bacc4efd09f9

    }
}

export default Ranktable;