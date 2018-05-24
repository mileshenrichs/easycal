import React, { Component } from 'react';
import deploymentConfig from '../Deployment/deploymentConfig';
import qs from 'qs';
import logo from '../resources/login-logo.png';
import loader from '../resources/loader.gif';

class LogInView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      registering: false,
      waiting: false,
      email: '',
      password: '',
      errorMessage: undefined
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      waiting: true,
      errorMessage: undefined
    });
    const reqObj = {
      email: this.state.email,
      password: this.state.password
    }

    // different requests depending on whether user is registering or logging in
    if(this.state.registering) {
      fetch(deploymentConfig().apiUrl + '/api/users/register', {
        method: 'POST',
        body: JSON.stringify(reqObj)
      })
      .then((resp) => resp.json())
      .then(res => {
        // check for errors creating user
        if(res.error) {
          if(res.message === 'user exists') { // email address exists in db
            this.setState({
              waiting: false,
              errorMessage: 'Looks like a user has already registered with that email address.'
            });
          } else if(res.message === 'missing field') {
            this.setState({
              waiting: false,
              errorMessage: 'Looks like you forgot to supply either your email address or password.'
            });
          }
        } else { // if no error, collect token and log user in
          const userToken = res.token;
          localStorage.setItem('token', userToken);
          window.location = deploymentConfig().baseUrl + '/?onboard=true';
        }
      });
    } else { // user is logging in (as opposed to registering)
      fetch(deploymentConfig().apiUrl + '/api/users/login', {
        method: 'POST',
        body: JSON.stringify(reqObj)
      })
      .then((resp) => resp.json())
      .then(res => {
        if(res.error) {
          if(res.message === 'user doesn\'t exist') {
            this.setState({
              waiting: false,
              errorMessage: 'There isn\'t an account registered to that email address.'
            });
          } else if(res.message === 'incorrect pass') {
            this.setState({
              waiting: false,
              errorMessage: 'That password is incorrect.'
            })
          } else if(res.message === 'missing field') {
            this.setState({
              waiting: false,
              errorMessage: 'Looks like you forgot to supply either your email address or password.'
            });
          }
        } else { // if no error, collect token and log user in
          const userToken = res.token;
          localStorage.setItem('token', userToken);
          window.location = deploymentConfig().baseUrl + '/';
        }
      });
    }
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value
    });
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  }

  switchActionType() {
    this.setState(prevState => ({
      registering: !prevState.registering
    }));
  }

  render() {
    let welcomeText;
    const qsParsed = qs.parse(this.props.location.search.slice(1));
    let justLoggedOut = qsParsed.logout;
    let sessionExpired = qsParsed.midreq;

    if(justLoggedOut) {
      welcomeText = (
        <span className="LogInView__notify LogInView__logout-confirm"><span role="img" aria-label="Success!">👍🏼</span> &nbsp;You have successfully logged out.</span>
      );
    } else if(sessionExpired) {
      welcomeText = (
        <span className="LogInView__notify LogInView__session-expired"><span role="img" aria-label="Clock">⏲️</span> &nbsp;Your session expired.  To keep things secure, please log back in.</span>
      );
    } else {
      welcomeText = (
        <p>
          <b>Welcome!</b> EasyCal is a simple nutrition app that helps you keep track of your diet and exercise. <br />
          <span>Please log in or register to continue.</span>
        </p>
      );
    }

    let submitButton;
    if(!this.state.waiting) {
      submitButton = (
        <button type="submit" className={'logInButton' + (this.state.waiting ? ' waiting' : '')}>
          {this.state.registering ? 'Register' : 'Log In'}
        </button>
      );  
    } else {
      submitButton = (
        <img className="LogInView__form--loader" src={loader} alt="Loading..." />
      );
    }

    let switchText;
    if(this.state.registering) {
      switchText = (
        <span className="LogInView__form--switch">
          You're registering a new account.  If you already have one, you can <span onClick={this.switchActionType.bind(this)}>log in</span>.
        </span>
      );
    } else {
      switchText = (
        <span className="LogInView__form--switch">
          Don't have an account? <span onClick={this.switchActionType.bind(this)}>Click here</span> to register.
        </span>
      );
    }

    return (
      <div className="LogInView content-container">
        <img className="LogInView__logo" src={logo} alt="EasyCal" />
        {welcomeText}

        <div className="LogInView__form">
          <h2>{this.state.registering ? 'Register a new account' : 'Log In'}</h2>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input type="email" id="email" placeholder="Email address" value={this.state.email} onChange={this.handleEmailChange.bind(this)} />
            </div>
            <div className="form-group">
              <label htmlFor="pass">Password</label>
              <input type="password" id="pass" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange.bind(this)} />
            </div>
            
            {submitButton}
          </form>
        </div>

        {this.state.errorMessage && <span className="LogInView__notify LogInView__error"><span role="img" aria-label="Oops!">😨</span> &nbsp;{this.state.errorMessage}</span>}

        {switchText}
      </div>
    );
  }
}

export default LogInView;