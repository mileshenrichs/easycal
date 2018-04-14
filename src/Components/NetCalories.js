import React, { Component } from 'react';

class NetCalories extends Component {
  render() {
    return (
      <div className="NetCalories">
        <span className="NetCalories__equation">
          <span className="NetCalories__number food">{new Intl.NumberFormat().format(this.props.caloriesEaten)}</span>
          <span className="NetCalories__label">calories from food</span>
          <span className="NetCalories__minussign">-</span>
          <span className="NetCalories__number exercise">{this.props.caloriesBurned ? new Intl.NumberFormat().format(this.props.caloriesBurned) : '0'}</span>
          <span className="NetCalories__label">calories from exercise</span>
          <span className="NetCalories__equals">=</span>
          <span className="NetCalories__number net">2,150</span>
        </span>
        <div className="clearfix"></div>

        <span className="NetCalories__goaldifference">(-50)</span>
        <div className="clearfix"></div>
      </div>
    );
  }
}

export default NetCalories;
