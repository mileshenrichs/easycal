import React, { Component } from 'react';
import decodeToken from '../Auth/authUtil';
import deploymentConfig from '../Deployment/deploymentConfig';
import MyGoals from './MyGoals';

class MyAccountView extends Component {

  componentDidMount() {
    document.title = 'EasyCal: My Account';
  }

  logUserOut() {
    // remove token from local storage
    localStorage.removeItem('token');

    // redirect to login page
    this.props.history.push({
      pathname: deploymentConfig().baseUrl() + '/login',
      search: '?logout=true'
    });
  }

  render() {
    const userToken = decodeToken(localStorage.getItem('token'));
    const userEmailAddress = userToken.emailAddress;

    return (
      <div className="MyAccountView content-container">
        <h1 className="page-title">My Daily Goals</h1>
        <MyGoals />
        <div className="MyAccountView__account-functions">
          <p>You're logged in as <b>{userEmailAddress}</b>.</p>
          <p className="MyAccountView__logout-link" onClick={this.logUserOut.bind(this)}>Log out</p>
        </div>
      </div>
    );
  }
}

export default MyAccountView;
