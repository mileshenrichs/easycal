import React, { Component } from 'react';

class MealTotalsRow extends Component {
  render() {
    return (
      <div className="MealTotalsRow">
  		  <span className="MealTotalsRow__label">TOTALS</span>
        <span className="MealTotals__macros">
          <span className="MealTotals__macros--carbs">
            {this.props.totals.carbs}
          </span>
          <span className="MealTotals__macros--fat">
            {this.props.totals.fat}
          </span>
          <span className="MealTotals__macros--protein">
            {this.props.totals.protein}
          </span>
        </span>
        <span className="MealTotals__calories">{this.props.totals.calories ? this.props.totals.calories : '--'}</span>
        <div className="clearfix"></div>
      </div>
    );
  }
}

export default MealTotalsRow;
