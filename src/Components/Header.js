import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import baseUrl from '../Deployment/deploymentConfig.js';
import logo from '../resources/logo.png';

class Header extends Component {
  render() {
    return (
      <header className="Header">
      	<div className="container">
      		<Link to={baseUrl() + "/"}>
      			<img src={logo} alt="EasyCal" />
      		</Link>
      		<nav>
      			<Link to={baseUrl() + "/"} className="nav__today-link">Today's Log</Link>
      			<Link to={baseUrl() + "/stats"}>Stats</Link>
      			<Link to={baseUrl() + "/me"}>My Account</Link>
      		</nav>
      		<div className="clearfix"></div>
      	</div>
      </header>
    );
  }
}

export default Header;
