import React, { Component } from 'react';
import loader from '../resources/spinning-loader.gif'

/**
 * Component that renders only when app is first mounted to hide DayView from
 * user until authentication is confirmed
 */
class AuthLoader extends Component {
  render() {
    return (
      <div className="AuthLoader">
      	<div className="AuthLoader__loader-container">
      		<img src={loader} alt="Loading..." />
      	</div>
      </div>
    );
  }
}

export default AuthLoader;
