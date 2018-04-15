import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../resources/logo.png';

class Header extends Component {
  render() {
    return (
      <header className="Header">
      	<div className="container">
      		<Link to="/">
      			<img src={logo} alt="EasyCal" />
      		</Link>
      		<nav>
      			<Link to="/" className="nav__today-link">Today (2,150 cal)</Link>
      			<Link to="/stats">Stats</Link>
      			<Link to="/me">My Account</Link>
      		</nav>
      		<div className="clearfix"></div>
      	</div>
      </header>
    );
  }
}

export default Header;
