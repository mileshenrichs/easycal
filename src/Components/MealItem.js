import React, { Component } from 'react';
import blueEditIcon from '../resources/blue-edit-icon.png';

class MealItem extends Component {
  render() {
    return (
      <div className="MealItem">
        <img src={blueEditIcon} alt="edit" className="MealItem__edit" />
  		  <span className="MealItem__food">
          <span className="MealItem__food--name">{this.props.item.name}</span>
          <span className="MealItem__food--quantity">
            {this.props.item.servingSize.quantity} 
            {' ' + this.props.item.servingSize.unit + (this.props.item.servingSize.quantity !== 1 ? 's' : '')}
          </span>
        </span>
        <span className="MealItem__macros">
          <span className="MealItem__macros--carbs">{this.props.item.carbs}</span>
          <span className="MealItem__macros--fat">{this.props.item.fat}</span>
          <span className="MealItem__macros--protein">{this.props.item.protein}</span>
        </span>
        <span className="MealItem__calories">{this.props.item.calories}</span>
        <div className="clearfix"></div>
      </div>
    );
  }
}

export default MealItem;
