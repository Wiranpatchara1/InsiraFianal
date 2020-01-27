import React from 'react';
import '../../bulma.css';
import logo from '../../image/logo.jpg';
import graph from '../../image/graph.jpg';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { SignUpLink } from '../SignUp';
class Landing extends React.Component {
<<<<<<< HEAD
=======
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
>>>>>>> Update Home

  render() {

    return (
      <div>
        {/*<button class="button is-primary" id='showModal' onClick={this.handleClick}>click</button>*/}
      
        {/* **************************************************************************** */}
        <div className="background">
          <div className="carduploard ">
            <div className="columns">
              <div className="column is-half">
                <div className="bolck ">
                  <p className="textcard">Automated Insight</p>
                  <p className="textcard">& Visualization</p>
                  <br />
                  <p className="textcard2">Insira is a new tool for Automated Visualization including generate Thai language description.</p>
                  <br /> <br /> <br />
                  <p className="textcard2 has-text-centered">Join with us now</p>
                  <p className="textcard2 has-text-centered">Plesase Sign in into the system</p><br />
    
                  <div className="has-text-centered">
                  <Link to={ROUTES.SIGN_IN}>
                    <button className="button is-info" >Sign in</button>
                  </Link>
                  </div>
<<<<<<< HEAD

                    <br />    
                    <SignUpLink />
=======
                  <br />
              


                   <Link to={ROUTES.DATA}>
                   <button className="button is-info" id="Input" 
                  onClick={this.handleClick}>
                    Upload</button>

                   </Link>
>>>>>>> Update Home
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
