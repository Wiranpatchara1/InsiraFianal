import React from 'react';
import '../../bulma.css';
import { withAuthorization } from '../Session';
import pic11 from '../../image/pic11.jpg';
import Header from '../Header';
import pic2 from '../../image/pic2.jpg';
import pic3 from '../../image/pic3.jpg';
import pic4 from '../../image/pic4.jpg';
import pic5 from '../../image/pic5.jpg';
import pic6 from '../../image/pic6.jpg';
import { StickyContainer} from 'react-sticky';
import SideBar from '../Slidebar ';
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
                <Header />
 
            {/* ****************************  Banner ********************************* */}
            <img src={pic11} alt='pic11'  />
            {/* <img src={pic1} alt='pic1'  /> */}
            {/* <Banner /> */}

            {/* *************************** botton ************************************* */}
            <br />
            <div className="columns is-centered">

            <div className="column is-half">
              <img src={pic2} alt='pic2'  />
            </div>
  
              <div className="column is-half">
                <div className="has-text-centered">
                <br />  <br /> <br />   <br />  <br /> <br />   <br />  <br /> <br />
                  <p className ="textcard"><h4>Upload CSV file to Visualization</h4></p>  
                  <p c><h4>pleas upload CSV file below for preprocess data</h4></p>  <br />
                  <div className="file is-centered">
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
                   
                  </div>
  
                  <button className="button is-info is-medium" id="Input"
                    onClick={this.handleClick}>
                    Upload</button>
                </div>
              </div>
             
            </div>
            {/* **************************** expect ****************************** */}
            <img src={pic5} alt='pic5'  />
            <img src={pic3} alt='pic3'  />

            {/* **************************** Footer ****************************** */}
            <img src={pic4} alt='pic4'  />
            {/* <br />  <br /> <br />

              <p className="textcard">Insira Team</p>
              <br />  <br /> <br />

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
  */}     <img src={pic6} alt='pic6'  />

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



