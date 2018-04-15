import React, { Component } from 'react';
import plusIcon from '../resources/plus-icon.png';

class AddableFoodItem extends Component {
  render() {
    return (
      <div className="AddableFoodItem">
      	<img src={plusIcon} alt="Add" className="AddableFoodItem__plus" />
			  <span className="MealItem__food">
	  		<span className="MealItem__food--name">Name</span>
	      <span className="MealItem__food--quantity">
	        5 worms
	      </span>
        </span>
        <span className="MealItem__macros">
          <span className="MealItem__macros--carbs">34</span>
          <span className="MealItem__macros--fat">10</span>
          <span className="MealItem__macros--protein">3</span>
        </span>
	        <span className="MealItem__calories">677</span>
	        <div className="clearfix"></div>
	      </div>
    );
  }
}

export default AddableFoodItem;
