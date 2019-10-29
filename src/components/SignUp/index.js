import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import logo from '../../image/logo.jpg';
import signup from '../../image/signup.jpg';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
  <div>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
          })
          .then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTES.HOME);
          })
          .catch(error => {
            this.setState({ error });
          });
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
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

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
        <div className="backgroundopaup">
          <div className="carduploardsign">
            <div className="columns">
              <div className="column ">
                <div className="bolck2">
                  <br />  <br />  <br />
                  <p className="textcard">Welcome to Insira</p>
                  <p className="textcard2">Lorem ipsum dolor sit amet, consectetuer </p>
                  <br />     <br />
                  <p className="textcard3">Sign up</p>
                  <br />
                  <form onSubmit={this.onSubmit}>
                    <div className="field">
                      <p className="control has-icons-left has-icons-right">
                        <input
                          className="input is-small"
                          name="username"
                          value={username}
                          onChange={this.onChange}
                          type="text"
                          placeholder="Full Name"
                        />
                        <span className="icon is-small is-left">
                          <i className="fas fa-user-edit"></i>
                        </span>
                      </p>
                    </div>
                    <div className="field">
                      <p className="control has-icons-left">
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
                          name="passwordOne"
                          value={passwordOne}
                          onChange={this.onChange}
                          type="password"
                          placeholder="Password"
                        />
                        <span className="icon is-small is-left">
                          <i className="fas fa-lock"></i>
                        </span>
                      </p>
                    </div>
                    <div className="field">
                      <p className="control has-icons-left">
                        <input
                          className="input is-small"
                          name="passwordTwo"
                          value={passwordTwo}
                          onChange={this.onChange}
                          type="password"
                          placeholder="Confirm Password"
                        />
                        <span className="icon is-small is-left">
                          <i className="fas fa-check-square"></i>
                        </span>
                      </p>
                    </div>
                    <br />
                    <button disabled={isInvalid} type="submit" className="button is-info is-small">
                      Create account
                    </button>
                    {error && <p>{error.message}</p>}
                  </form>
                  <br />
                </div>
              </div>
              <div className="column ">
                <img src={signup} alt='signup' width='450px' />
              </div>
            </div>
          </div>
        </div>
      </div>


    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };
