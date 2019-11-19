import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import logo from '../../image/logo.jpg';
import sign from '../../image/sign.jpg';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
const SignInPage = () => (
  <div>
    <SignInForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {

  // ***************************************************************

  state = { isSignedIn: false }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  }
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      console.log("user", user)
    })
  }

  // ***************************************************************
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (

<div>
     <div className="header">
        <img src={logo} alt='logo' width = '110px' className="has-text-centered"/>
         <div className="header-right">
           <Link to={ROUTES.SIGN_IN}>Sign in</Link>
           <Link to={ROUTES.SIGN_UP}>Create account </Link>
         </div>
     </div>
     {/* **************************************************************************** */}
    <div className="backgroundopa">
       <div className="carduploardsign">
           <div className="columns">
              <div className="column ">
                <div className="bolck2">
                  <br/>  <br/>
                <p className="textcard">Welcome to Insira</p>
                <p className="textcard2">Lorem ipsum dolor sit amet, consectetuer </p>
                <br/>
                <p className="textcard2">Sign in</p>
                <br/>
                  <form onSubmit={this.onSubmit}>
                    <div className="field">
                      <p className="control has-icons-left has-icons-right">
                      <input
                        className="input is-small"
                        name="email"
                        value={email}
                        onChange={this.onChange}
                        type="text"
                        placeholder="Email Address"
                      />
                        <span className="icon is-small is-left">
                          <i className="fas fa-envelope"></i>
                        </span>
                      </p>
                    </div>
                    <div className="field">
                      <p className="control has-icons-left">
                      <input
                        className="input is-small"
                        name="password"
                        value={password}
                        onChange={this.onChange}
                        type="password"
                        placeholder="Password"
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-lock"></i>
                      </span>
                      </p>
                    </div>
                    <button disabled={isInvalid} type="submit"  className="button is-info is-small">
                      Sign in
                    </button>
                    {error && <p>{error.message}</p>}
                  </form>
                  <br/>
                  <PasswordForgetLink />
                  <SignUpLink />
                  <br/>
                  <p className="textcard2">or</p>
 {/* ****************************  signin API **************************** */}

                  <div className="App">
                    {this.state.isSignedIn ? (
                      <span>
                        <div>Signed In!</div>
                        <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
                        <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
                        <img alt="profilepic"src={firebase.auth().currentUser.photoURL}/>
                      </span>
                    ) : (
                      <StyledFirebaseAuth
                        uiConfig={this.uiConfig}
                        firebaseAuth={firebase.auth()}
                      />
                    )}
                  </div>
     {/* **************************************************************************** */}
                </div>
              </div>
            <div className="column ">
                <img src={sign} alt='sign' width='500px' />
            </div>
          </div>
       </div>
    </div>
  </div>
  
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };
