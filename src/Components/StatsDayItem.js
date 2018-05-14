import React, { Component } from 'react';

class StatsDayItem extends Component {
  render() {
    return (
      <div className="StatsDayItem">
  		  <span className="StatsDayItem__day">{this.props.day}</span>
        <span className="StatsDayItem__macros">
          <span>{this.props.carbs}</span>
          <span>{this.props.fat}</span>
          <span>{this.props.protein}</span>
          <span>{this.props.fiber}</span>
          <span>{this.props.sugar}</span>
          <span>{this.props.sodium}</span>
        </span>
        <span className="StatsDayItem__calories">{this.props.calories}</span>
        <div className="clearfix"></div>
      </div>
    );
  }
}

export default StatsDayItem;
