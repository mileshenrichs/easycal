import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import ProtectedRoute from './Auth/ProtectedRoute';
import AuthLoader from './Auth/AuthLoader';
import deploymentConfig from './Deployment/deploymentConfig';
import './App.css';
import Header from './Components/Header';
import Favicon from 'react-favicon';
import LogInView from './Components/LogInView';
import DayView from './Components/DayView';
import AddFoodViewContainer from './Components/AddFoodViewContainer';
import CreateFoodView from './Components/CreateFoodView';
import StatisticsView from './Components/StatisticsView';
import MyAccountView from './Components/MyAccountView';
import Footer from './Components/Footer';
import appFavicon from './resources/favicon.png';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userLoggedIn: false
    }
  }

  /**
   * Called before loading every page, if false then remove token 
   * and redirect to login page
   */
  checkAuth() {
    let userLoggedIn = false;
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsImVtYWlsQWRkcmVzcyI6Im1pbGVzaGVucmljaHMyMUBnbWFpbC5jb20iLCJleHAiOjE1Mjc1NTk4MjF9.g5UBRT_exrjGsfnakznuoQaANjRtFaqXe2KUwYOXsHM');
    const token = localStorage.getItem('token');

    // check if there's a token in storage
    if(token) {
      const reqObj = {
        token: token
      };

      fetch(deploymentConfig().apiUrl + '/api/auth/check', {
        method: 'POST',
        body: JSON.stringify(reqObj)
      })
      .then((resp) => resp.json())
      .then(res => {
        if(res.auth) { // authentication is valid
          userLoggedIn = true;
          if(this.state.userLoggedIn !== userLoggedIn) {
            this.setState({userLoggedIn});
          }
        } else { // auth invalid
          localStorage.removeItem('token');
          window.location.href = deploymentConfig().baseUrl + '/login?midreq=true';
        }
      });
    } else { // no token = no auth
      if(!document.location.href.includes('login')) {
        window.location.href = deploymentConfig().baseUrl + '/login?midreq=true';
      }
    }

    // return value doesn't matter, auth logic is handled within function
    return true;
  }

  render() {
    let location = document.location.href;
    let onLoginPage = location.includes('login');

    return (
      <div className="App">

      {(location.substring(location.length - deploymentConfig().baseUrl.length) === deploymentConfig().baseUrl || location.substring(location.length - (deploymentConfig().baseUrl.length + 1)) === deploymentConfig().baseUrl + '/') 
          && !this.state.userLoggedIn && <AuthLoader />}

        <Favicon url={appFavicon} />
        {!onLoginPage && <Header />}
        <Switch>

          <ProtectedRoute path={deploymentConfig().baseUrl + "/login"} exact={true}
              trueComponent={LogInView}
              decisionFunc={this.checkAuth.bind(this)}
          />

          <ProtectedRoute path={deploymentConfig().baseUrl + "/"} exact={true}
            trueComponent={DayView}
            decisionFunc={this.checkAuth.bind(this)}
          />

          <ProtectedRoute path={deploymentConfig().baseUrl + "/add"} exact={true}
            trueComponent={AddFoodViewContainer}
            decisionFunc={this.checkAuth.bind(this)}
          />

          <ProtectedRoute path={deploymentConfig().baseUrl + "/createfood"} exact={true}
            trueComponent={CreateFoodView}
            decisionFunc={this.checkAuth.bind(this)}
          />

          <ProtectedRoute path={deploymentConfig().baseUrl + "/stats"} exact={true}
            trueComponent={StatisticsView}
            decisionFunc={this.checkAuth.bind(this)}
          />

          <ProtectedRoute path={deploymentConfig().baseUrl + "/me"} exact={true}
            trueComponent={MyAccountView}
            decisionFunc={this.checkAuth.bind(this)}
          />

        </Switch>
        <Footer onLogin={onLoginPage} />
    	</div>
    );
  }
}

export default App;
