import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import deploymentConfig from '../Deployment/deploymentConfig';

class OnboardingMessage extends Component {
  render() {
    return (
      <div className="OnboardingMessage">
        <h3>Welcome to EasyCal!</h3>
        <p>This is your daily log, where you can record the foods you eat throughout the day.  You can navigate between days using the calendar control 
        below.  It'd be a good idea to <Link to={deploymentConfig().baseUrl + "/me"}>set up your goals</Link> first, 
        then come back to this screen by clicking the "Today's Log" button in the navigation bar.</p>
      </div>
    );
  }
}

export default OnboardingMessage;
