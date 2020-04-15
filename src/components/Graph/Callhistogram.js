import React, { Component } from 'react';
import $ from 'jquery';
import Histogram from './Histogram';
import '../../custom.scss';

class Callhistogram extends Component {
  constructor(props) {
    super(props);
    this.state = { call: false };
    this.closeModal = this.closeModal.bind(this);

  }
  componentDidMount() {
    const now = this;
    $.ajax({
      url: 'http://127.0.0.1:5000/data?arg1=distribution',
      type: "GET",
      dataType: 'json',
      success: function (res) {
        now.setState(state => ({
          Histogram: res
        }))
      }
    }).then(
      console.log(this.state.Histogram)
    )
  }
  closeModal(name) {
    $(name).removeClass("is-active");
  }


  render() {
    return (
      <div id='distribution'>
        {this.state.Histogram && this.state.Histogram.Values.map((d, i) => {
          var keys = Object.keys(d)[0];
          var data = d[keys];
          var binwidth = Math.round(Math.sqrt(data.length))

          return (
            <div id={'distribution__' + i} class="modal">
              <div class="modal-background"></div>
              <div class="modal-content">
                <section class="modal-card-body">
                  <div id={'distribution_' + i} className='box'>
                    <Histogram key={i} data={data} name={keys} graphid={'distribution_' + i} nbin={binwidth}/>
                    {/*<p>
                    <label># bins</label>
                      <input type="number" min="1" max="100" step="30" value={binwidth} id={"nbin" + 'distribution_' + i}></input>
                    </p>*/}
                  </div>
                  <div className='box'>
                    <h4>{this.state.Histogram.Descriptions[i][keys]}</h4>
                  </div>
                </section>
              </div>
              <button class="modal-close is-large" aria-label="close" onClick={() => this.closeModal('#distribution__' + i)}></button>
            </div>
          )
        })}
      </div>
    );

  }
}
/*
<div id={'distribution__' + i} class="modal">
              <div class="modal-background"></div>
              <div class="modal-content">
                <section class="modal-card-body">
                  <div id={'distribution_' + i} className='box'>
                    <Histogram key={i} data={data} name={keys} graphid={'distribution_' + i} />
                  </div>
                  <div className='box'>
                    <h4>{this.state.Histogram.Descriptions[i][keys]}</h4>
                  </div>
                </section>
              </div>
              <button class="modal-close is-large" aria-label="close" onClick={() => this.closeModal('#distribution__' + i)}></button>
            </div>


<div className='columns is-centered'>
                  <div className='column is-9'>
                    <div id={'distribution_'+i} className='box'>
                      <Histogram key={i} data={data} name={keys} graphid={'distribution_'+i}/>
                    </div>
                  </div>
                  <div className='column is-2'>
                    <div className='box'>
                      <h4>{this.state.Histogram.Descriptions[i][keys]}</h4>
                    </div>
                  </div>
                </div> */
export default Callhistogram;