import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import baseUrl from '../Deployment/deploymentConfig';
import plusIcon from '../resources/plus-icon.png';

class AddFoodItem extends Component {
  render() {
    let day = this.props.day.toISOString().split('T')[0];

    return (
    	<Link to={baseUrl() + '/add?m=' + this.props.meal.toLowerCase() + '&day=' + day} className="AddFoodItem__link">
      	<div className="AddFoodItem">
	        <img src={plusIcon} alt="+" />
	        <span>Add Food Item</span>
        </div>
      </Link>
      
    );
  }
}

export default AddFoodItem;
