import React, { Component } from 'react';
import logo from '../resources/logo.png';

class Header extends Component {
  render() {
    return (
      <header className="Header">
      	<div className="container">
      		<a href="#">
      			<img src={logo} alt="EasyCal" />
      		</a>
      		<nav>
      			<a href="#" className="nav__today-link">Today (2,150 cal)</a>
      			<a href="#">Stats</a>
      			<a href="#">My Account</a>
      		</nav>
      		<div className="clearfix"></div>
      	</div>
      </header>
    );
  }
}

export default Header;
