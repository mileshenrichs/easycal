import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import deploymentConfig from '../Deployment/deploymentConfig.js';
import logo from '../resources/logo.png';

class Header extends Component {
  render() {
    return (
      <header className="Header">
      	<div className="container Header-container">
      		<Link to={deploymentConfig().baseUrl + "/"}>
      			<img src={logo} alt="EasyCal" />
      		</Link>
      		<nav>
      			<Link to={deploymentConfig().baseUrl + "/"} className="nav__today-link">Today's Log</Link>
      			<Link to={deploymentConfig().baseUrl + "/stats"}>Stats</Link>
      			<Link to={deploymentConfig().baseUrl + "/me"}>My Account</Link>
      		</nav>
      		<div className="clearfix"></div>
      	</div>
      </header>
    );
  }
}

export default Header;
