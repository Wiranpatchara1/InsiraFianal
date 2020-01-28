import React from 'react';
import '../../bulma.css';
import logo from '../../image/logo.jpg';
import graph from '../../image/graph.jpg';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import FileDrop from 'react-file-drop';
import $ from 'jquery';
import Testtable from '../Graph/Testtable';
import { statements } from '@babel/template';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = { test: true };
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.handleChangeFile = this.handleChangeFile.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  handleDrop = (files, event) => {
    console.log(files, event);
  }
  // $("#showModal").click(function () {
  //   $(".modal").addClass("is-active");
  // });

  // $("#modal-close").click(function () {
  //   $(".modal").removeClass("is-active");
  // });
  showModal() {
    $(".modal").addClass("is-active");
  }
  closeModal() {
    $(".modal").removeClass("is-active");
  }
  handleClick() {
    this.setState(state => ({
      test: !state.test
    }));
    console.log(this.state.test)
    const now = this;
    $.ajax({
      url: "http://127.0.0.1:5000/upload",
      type: "post",
      dataType: 'json',
      processData: false, // important
      contentType: false, // important  
      data: now.state.file,
      success: function (text) {
        fetch('http://127.0.0.1:5000/upload').then(
            data => data.json()
          ).then(
              data => {now.setState(state => ({
                data:data
              }))}
            ).then(
              now.showModal()
            )
      },
      error: function () {
        alert("An error occured, please try again.");
      }
    });
  }
  handleChangeFile(event) {
    const file = event.target.files[0];
    let formData = new FormData();
    formData.append('file', file);
    this.setState(state => ({
      file: formData
    }));
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.state.data !== prevProps.data) {
      console.log("Show leay")
    }
  }

  render() {

    return (
      <div>
        <div class="modal">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">Config column type</p>
              <button class="delete" aria-label="close" onClick={this.closeModal}></button>
            </header>
            <section class="modal-card-body">
              {this.state.data&&<Testtable data={this.state.data} />}
            </section>
            <footer class="modal-card-foot">
              <Link to={ROUTES.DATA}>
                <button class="button is-success">Visualization</button>
              </Link>
            </footer>
          </div>
        </div>
        {/*<button class="button is-primary" id='showModal' onClick={this.handleClick}>click</button>*/}
        <div className="header">
          <img src={logo} alt='logo' width='110px' className="has-text-centered" />
          <div className="header-right">
            <Link to={ROUTES.SIGN_IN}>Sign in</Link>
            <Link to={ROUTES.SIGN_UP}>Create account </Link>
          </div>
        </div>
        {/* **************************************************************************** */}
        <div className="background">
          <div className="carduploard ">
            <div className="columns">
              <div className="column ">
                <div className="bolck ">
                  <p className="textcard">Automated Insight</p>
                  <p className="textcard">& Visualization</p>
                  <p className="textcard2">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Curabitur ullamcorper ultricies nisi. Nam eget dui. </p>
                  <br />
                </div>
                <div className="bolck2">
                  <p className="textcard3">Upload CSV file</p>
                  <div className="file">
                    <label className="file-label">
                      <input className="file-input" type="file" name="resume" onChange={this.handleChangeFile} />
                      <span className="file-cta">
                        <span className="file-icon">
                          <i className="fas fa-upload"></i>
                        </span>
                        <span className="file-label" >
                          Choose a file…
                          </span>
                      </span>
                    </label>
                  </div>
                  <br />
                  <div id="react-file-drop-demo">
                    <FileDrop onDrop={this.handleDrop}>
                      Drop some files here!
                      </FileDrop>
                  </div>
                  <br />



                  {/*<Link to={ROUTES.DATA}>*/}
                  <button className="button is-info" id="Input"
                    onClick={this.handleClick}>
                    Upload</button>

                  {/*</Link>*/}
                </div>
              </div>
              <div className="column ">
                <img src={graph} alt='graph' width='350px' />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }



}





export default Landing;
