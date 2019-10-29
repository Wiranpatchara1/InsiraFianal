import React from 'react';
import '../../bulma.css';
import SignOutButton from '../SignOut';
import { withAuthorization } from '../Session';
import logo from '../../image/logo.jpg';
import niti from '../../image/niti.png';
import tang from '../../image/Tang.png';
import nut from '../../image/Nut.png';
import ban from '../../image/banner5.png';
import SideBar from '../Slidebar ';
import { StickyContainer, Sticky } from 'react-sticky';
import firebase from "firebase";
import FileDrop from 'react-file-drop';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import $ from 'jquery';
import Testtable from '../Graph/Testtable';
class HomePage extends React.Component {
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
          data => {
            now.setState(state => ({
              data: data
            }))
          }
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
      <StickyContainer>
        <div id="App">
          {/*config*/}
          <div class="modal">
            <div class="modal-background"></div>
            <div class="modal-card">
              <header class="modal-card-head">
                <p class="modal-card-title">Config column type</p>
                <button class="delete" aria-label="close" onClick={this.closeModal}></button>
              </header>
              <section class="modal-card-body">
                {this.state.data && <Testtable data={this.state.data} />}
              </section>
              <footer class="modal-card-foot">
                <Link to={ROUTES.ANALYTIC}>
                  <button class="button is-success">Visualization</button>
                </Link>
              </footer>
            </div>
          </div>
          {/*config*/}
          <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
          <div id="page-wrap">
            <Sticky>
              {({
                style,
                // the following are also available but unused in this example
                isSticky,
                wasSticky,
                distanceFromTop,
                distanceFromBottom,
                calculatedHeight
              }) => (
                  <header className="header" style={style}>
                    <div class="columns is-multiline ">
                      <div className="column  is-offset-3">
                        <img src={logo} alt='logo' width='110px' className="has-text-centered" />
                      </div>

                      {/* <div className="column is-1">
                <h5>{firebase.auth().currentUser.displayName}</h5>
               </div>    
                       */}
                      {/* <button onClick={() => firebase.auth().signOut()}>Sign out!</button> */}
                      <div class="column is-2 ">
                        <p className="textcard2">{firebase.auth().currentUser.displayName}</p>
                        <SignOutButton />
                      </div>

                      <div className="column is-1">
                        <img alt="profilepic" src={firebase.auth().currentUser.photoURL} />
                      </div>

                    </div>
                  </header>
                )}
            </Sticky>
            {/* **************************************************************************** */}

            <div className="backgrounddash">

              <div className="columns">

                <img src={ban} alt='ban' width='45%' />


              </div>

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
            {/* **************************************************************************** */}
            <br />      <br />      <br />

            <p className="textcard">Insira Team</p>
            <br />      <br />      <br />
            <div className="header">
              <div className="columns is-0">
                <div className="column">

                  <img src={niti} alt='niti' width='200px' />
                  <br />
                  <br />
                  <p className="textcard3">NITI BUESAMAE </p>    <br />
                  <p className="textcard3">Computer Engineering </p>
                  <p className="textcard3">King Mongkut’s University of Technology Thonburi</p>

                </div>
                <div className="column">
                  <img src={tang} alt='tang' width='200px' />
                  <br />
                  <br />
                  <p className="textcard3">WIRANPATCHARA HOMKAEN</p>    <br />
                  <p className="textcard3">Computer Engineering </p>
                  <p className="textcard3">King Mongkut’s University of Technology Thonburi</p>
                </div>
                <div className="column">
                  <img src={nut} alt='nut' width='200px' />
                  <br />
                  <br />
                  <p className="textcard3">NATTAPAT YUVASUTA</p>    <br />
                  <p className="textcard3">Computer Engineering </p>
                  <p className="textcard3">King Mongkut’s University of Technology Thonburi</p>
                </div>
              </div>
            </div>
            {/* **************************************************************************** */}
            <footer class="footer">
              <div class="content has-text-centered">
                <p>
                  Powered by   <strong>  Insira </strong>The source code is licensed
      <a href="http://www.kmutt.ac.th/">   ing Mongkut’s University of Technology Thonburi</a>.
    </p>
              </div>
            </footer>
            {/* **************************************************************************** */}

          </div>
        </div>
      </StickyContainer>
    );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);



