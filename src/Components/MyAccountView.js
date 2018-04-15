import React, { Component } from 'react';
import MyGoals from './MyGoals';

class MyAccountView extends Component {

  componentDidMount() {
    document.title = 'EasyCal: My Account';
  }

  render() {
    return (
      <div className="MyAccountView content-container">
        <h1 className="page-title">My Daily Goals</h1>
        <MyGoals />
      </div>
    );
  }
}

export default MyAccountView;
