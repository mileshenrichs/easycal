import React, { Component } from 'react';
import plusIcon from '../resources/plus-icon.png';

class AddFoodItem extends Component {
  render() {
    return (
      <div className="AddFoodItem">
        <img src={plusIcon} alt="+" />
  		  <span>Add Food Item</span>
      </div>
    );
  }
}

export default AddFoodItem;
