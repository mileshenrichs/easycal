import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../resources/favicon.png';

class Footer extends Component {
  render() {
    return (
      <div className="Footer container">
        <img src={logo} alt="EasyCal" />
        <p>&copy; EasyCal 2018</p>
        <span className="Footer__links">
        	<Link to="/">Today's Log</Link><span className="Footer__link-separator">·</span>
        	<Link to="/stats">Stats</Link><span className="Footer__link-separator">·</span>
        	<Link to="/me">My Account</Link>
        </span>
        <div className="clearfix"></div>
      </div>
    );
  }
}

export default Footer;
