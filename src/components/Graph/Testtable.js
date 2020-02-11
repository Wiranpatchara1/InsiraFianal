import React, { Component } from 'react';
import '../../bulma.css';
import $ from 'jquery';


class Testtable extends Component {
  constructor(props) {
    super(props);
    this.state = { call: false, coltype: ['unique', 'ordinal', 'numeric', 'category', 'date'] };
    this.handletypeChange = this.handletypeChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handletargetChange = this.handletargetChange.bind(this);
  }
  componentDidMount() {
    const { data } = this.props;
    this.setState(state => ({
      data: data
    }));
    // const now = this;
    // $.ajax({
    //   url: 'http://127.0.0.1:5000/upload',
    //   type: "GET",
    //   dataType: 'json',
    //   success: function (res) {
    //     console.log(res);
    //     now.setState(state => ({
    //       data: res
    //     }));
    //   }
    // });
  }
  handletypeChange(colname, e) {
    console.log(e.target.value);
    let data_temp = this.state.data;
    var result = this.state.data.findIndex(
      entry => entry.col_name === colname
    );
    data_temp[result].col_type = e.target.value;
    console.log(result);
    this.setState(state => ({
      data: data_temp
    }))
  }
  handletargetChange(colname, e) {
    // console.log(e.target.value);
    // let data_temp = this.state.data;
    // var result = this.state.data.findIndex(
    //   entry => entry.col_name === colname
    // );
    this.setState(state => ({
      target: colname
    }))
  }
  handleClick() {
    const now = this;
    // console.log("click",now.state.data)

    $.ajax({
      url: "http://127.0.0.1:5000/data",
      type: "post",
      dataType: 'json',
      contentType: 'application/json',
      processData: false, // important
      data: JSON.stringify({ 'data': now.state.data, 'target': now.state.target }),
      success: function (text) {
        alert("Change data type success");
      }
    });
  }

  render() {
    // return <div id={"#" + this.props.id}></div>
    return (
      <div >
        <div className="columns is-centered is-vcentered is-mobile">
            <div className="column is-narrow has-text-centered">
              <table class="table is-bordered is-hoverable">
                <thead>
                  <tr>
                    <th>col_name</th>
                    <th>col_type</th>
                    <th>target</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data && this.state.data.map((data, key) => {
                    return (
                      <tr key={key}>
                        <td>{data.col_name}</td>
                        <td><select value={data.col_type} key={`item-${data.col_type}`} onChange={(e) => this.handletypeChange(data.col_name, e)}>
                          {this.state.coltype.map((value, i) => (
                            <option value={value} key={i}>{value}</option>
                          ))}
                        </select>
                        </td>
                        <td><input type="radio" name="target" value={data.col_name} style={{ textAlign: "center", verticalAlign: "center" }} onChange={(e) => this.handletargetChange(data.col_name, e)}></input></td>

                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <button class="button is-success" onClick={this.handleClick}>send</button>
            </div>
          </div>
        </div>
    );

  }
}

export default Testtable;