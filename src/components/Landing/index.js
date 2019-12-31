import React from 'react';
import '../../bulma.css';
import logo from '../../image/logo.jpg';
import graph from '../../image/graph.jpg';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import FileDrop from 'react-file-drop';
import $ from 'jquery';
import { statements } from '@babel/template';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {test: true};
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.handleChangeFile = this.handleChangeFile.bind(this);
  }
  handleDrop = (files, event) => {
    console.log(files, event);
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
          // alert(text);
          // if (text === "success") {
          //     alert("Your data was uploaded successfully");
          // }
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
    //Make a request to server and send formData
  //   $.ajax({
  //     url: "http://127.0.0.1:5000/upload",
  //     type: "post",
  //     dataType: 'json',
  //     processData: false, // important
  //     contentType: false, // important  
  //     data: formData,
  //     success: function (text) {
  //         alert(text);
  //         if (text === "success") {
  //             alert("Your data was uploaded successfully");
  //         }
  //     },
  //     error: function () {
  //         alert("An error occured, please try again.");
  //     }
  // });
  }

  render() {

    return (
      <div>
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
                      <input className="file-input" type="file" name="resume" onChange={this.handleChangeFile}/>
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
              


                   <Link to={ROUTES.DATA}>
                   <button className="button is-info" id="Input" 
                  onClick={this.handleClick}>
                    Upload</button>

                   </Link>
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
