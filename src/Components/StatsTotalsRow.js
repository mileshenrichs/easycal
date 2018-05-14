import React, { Component } from 'react';

class StatsTotalsRow extends Component {
  render() {
    return (
      <div className="StatsTotalsRow">
  		  <span className="StatsTotalsRow__label">TOTALS</span>
        <span className="StatsTotalsRow__macros">
          <span>{this.props.totals.carbs}</span>
          <span>{this.props.totals.fat}</span>
          <span>{this.props.totals.protein}</span>
          <span className="micro">{this.props.totals.fiber}</span>
          <span className="micro">{this.props.totals.sugar}</span>
          <span className="micro">{this.props.totals.sodium}</span>
        </span>
        <span className="MealTotals__calories">{this.props.totals.calories}</span>
        <div className="clearfix"></div>
      </div>
    );
  }
}

export default StatsTotalsRow;
