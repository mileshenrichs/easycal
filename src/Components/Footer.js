import React, { Component } from 'react';
import logo from '../resources/favicon.png';

class Footer extends Component {
  render() {
    return (
      <div className="Footer container">
        <img src={logo} alt="EasyCal" />
        <p>&copy; EasyCal 2018</p>
        <span className="Footer__links">
        	<a href="#">Today's Log</a><span className="Footer__link-separator">·</span>
        	<a href="#">Stats</a><span className="Footer__link-separator">·</span>
        	<a href="#">My Account</a>
        </span>
        <div className="clearfix"></div>
      </div>
    );
  }
}

export default Footer;
