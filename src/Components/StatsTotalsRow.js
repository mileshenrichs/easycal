import React, { Component } from 'react';

class StatsTotalsRow extends Component {
  render() {
    return (
      <div className="StatsTotalsRow">
  		  <span className="StatsTotalsRow__label">WEEKLY TOTALS</span>
        <span className="StatsTotalsRow__macros">
          <span>582</span>
          <span>164</span>
          <span>219</span>
          <span className="micro">44</span>
          <span className="micro">358</span>
          <span className="micro">6000</span>
        </span>
        <span className="MealTotals__calories">3,500</span>
        <div className="clearfix"></div>
      </div>
    );
  }
}

export default StatsTotalsRow;
