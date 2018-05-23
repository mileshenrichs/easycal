import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import baseUrl from '../Deployment/deploymentConfig';
import logo from '../resources/favicon.png';

class Footer extends Component {
  render() {
    return (
      <div className="Footer container">
        <img src={logo} alt="EasyCal" />
        <p>&copy; EasyCal 2018</p>

        {!this.props.onLogin && <span className="Footer__links">
        	<Link to={baseUrl() + "/"}>Today's Log</Link><span className="Footer__link-separator">·</span>
        	<Link to={baseUrl() + "/stats"}>Stats</Link><span className="Footer__link-separator">·</span>
        	<Link to={baseUrl() + "/me"}>My Account</Link>
        </span>}

        <div className="clearfix"></div>
      </div>
    );
  }
}

export default Footer;
