import React, { Component } from 'react';

class StatsDayItem extends Component {
  render() {
    return (
      <div className="StatsDayItem">
  		  <span className="StatsDayItem__day">Monday, April 9</span>
        <span className="StatsDayItem__macros">
          <span>20</span>
          <span>18</span>
          <span>34</span>
          <span>7</span>
          <span>24</span>
          <span>2100</span>
        </span>
        <span className="StatsDayItem__calories">260</span>
        <div className="clearfix"></div>
      </div>
    );
  }
}

export default StatsDayItem;
