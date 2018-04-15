import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import plusIcon from '../resources/plus-icon.png';

class AddFoodItem extends Component {
  render() {
    return (
    	<Link to="/add" className="AddFoodItem__link">
      	<div className="AddFoodItem">
	        <img src={plusIcon} alt="+" />
	        <span>Add Food Item</span>
        </div>
      </Link>
      
    );
  }
}

export default AddFoodItem;
