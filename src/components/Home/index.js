import React from 'react';
import '../../bulma.css';
import SignOutButton from '../SignOut';
import { withAuthorization } from '../Session';
import logo from '../../image/logo.jpg';
import niti from '../../image/niti.png';
import tang from '../../image/Tang.png';
import pic1 from '../../image/pic1.jpg';
import pic11 from '../../image/pic11.jpg';
import pic2 from '../../image/pic2.jpg';
import pic3 from '../../image/pic3.jpg';
import pic4 from '../../image/pic4.jpg';
import pic5 from '../../image/pic5.jpg';
import nut from '../../image/Nut.png';
import SideBar from '../Slidebar ';
import firebase from "firebase";
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import $ from 'jquery';
import Testtable from '../Graph/Testtable';
import Banner from '../Banner ';
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
  showModal(name) {
    $(name).addClass("is-active");
  }
  closeModal(name) {
    $(name).removeClass("is-active");
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
          now.showModal('#config-type')
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

        <div id="App">
          {/*config*/}
          <div class="modal" id="config-type">
            <div class="modal-background"></div>
            <div class="modal-card">
              <header class="modal-card-head">
                <p class="modal-card-title">Config column type</p>
                <button class="delete" aria-label="close" onClick={() => {this.closeModal("#config-type")}}></button>
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
          {/*Disclaimer*/}
          <div class="modal" id="disclaimer">
            <div class="modal-background"></div>
            <div class="modal-card">
              <header class="modal-card-head">
                <p class="modal-card-title">Disclaimer</p>
                <button class="delete" aria-label="close" onClick={() => {this.closeModal("#disclaimer")}}></button>
              </header>
              <section class="modal-card-body">
                <p>
                ข้อตกลงในการใช้ซอฟต์แวร์ 
     ซอฟต์แวร์นี้เป็นผลงานที่พัฒนาขึ้นโดย นายนิติ บือสาแม,นายณัฐพัชร์ ยุวะสุตและ นางสาววิรัลพัชร หอมแก่น จาก มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี ภายใต้การดูแลของ ผศ.ดร.สันติธรรม พรหมอ่อนภายใต้โครงการ “ซอฟท์วิเคราะห์ข้อมูลอัตโนมัติ”
 ซึ่งสนับสนุนโดย ศูนย์เทคโนโลยีอิเล็กทรอนิกส์และคอมพิวเตอร์แห่งชาติ โดยมีวัตถุประสงค์เพื่อส่งเสริมให้นักเรียนและนักศึกษาได้เรียนรู้และฝึก ทักษะในการพัฒนาซอฟต์แวร์ ลิขสิทธิ์ของซอฟต์แวร์นี้จึงเป็นของผู้พัฒนา 
ซึ่งผู้พัฒนาได้อนุญาตให้ศูนย์เทคโนโลยีอิเล็กทรอนิกส์และคอมพิวเตอร์แห่ง ชาติ เผยแพร่ซอฟต์แวร์นี้ตาม “ต้นฉบับ” โดยไม่มีการแก้ไขดัดแปลงใดๆ ทั้งสิ้น ให้แก่บุคคลทั่วไปได้ใช้เพื่อประโยชน์ส่วนบุคคลหรือประโยชน์ทางการศึกษาที่
 ไม่มีวัตถุประสงค์ในเชิงพาณิชย์ โดยไม่คิดค่าตอบแทนการใช้ซอฟต์แวร์ ดังนั้น ศูนย์เทคโนโลยีอิเล็กทรอนิกส์และคอมพิวเตอร์แห่งชาติ จึงไม่มีหน้าที่ในการดูแล บำรุงรักษา จัดการอบรมการใช้งาน หรือพัฒนาประสิทธิภาพซอฟต์แวร์ 
รวมทั้งไม่รับรองความถูกต้องหรือประสิทธิภาพการทำงานของซอฟต์แวร์ ตลอดจนไม่รับประกันความเสียหายต่างๆ อันเกิดจากการใช้ซอฟต์แวร์นี้ทั้งสิ้น<br/>
License Agreement
     This software is a work developed by Niti Buesamae, Nattapat Yuvasuta and Wiranphatchara hoemkaen from King mongkut's University Technology Thonburi 
under the provision of Santitham Promon under “Automated visualization with description” , which has been supported by the National Electronics and Computer Technology Center (NECTEC)
, in order to encourage pupils and students to learn and practice their skills in developing software.  Therefore, the intellectual property of this software shall belong
 to the developer and the developer gives NECTEC a permission to distribute this software as an “as is ” and non-modified software for a temporary and
 non-exclusive use without remuneration to anyone for his or her own purpose or academic purpose, which are not commercial purposes.  In this connection,
 NECTEC and SIPA shall not be responsible to the user for taking care, maintaining, training or developing the efficiency of this software. Moreover, 
NECTEC shall not be liable for any error, software efficiency and damages in connection with or arising out of the use of the software.”
                </p>
              </section>
            </div>
          </div>
          {/*Disclaimer*/}
          <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
          <div id="page-wrap">

                  <header className="header" >
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
                        <img alt="profilepic" style={{ borderRadius: '50%' }} width={50} height={50} src={firebase.auth().currentUser.photoURL} />
                      </div>

                    </div>
                  </header>

 
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
  */}

            {/* **************************************************************************** */}
            <footer class="footer">
              <div class="content has-text-centered">
                <p>
                  Powered by   <strong>  Insira </strong>The source code is licensed
                <a href="http://www.kmutt.ac.th/">   King Mongkut’s University of Technology Thonburi</a>.
              </p>
              <a href='javascript:void(0)' onClick={() => this.showModal("#disclaimer")}>ข้อตกลงการใช้ซอฟต์แวร์</a>
              </div>
            </footer>
            {/* **************************************************************************** */}

          </div>
        </div>

    );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);



