import React, { Component } from 'react';
import AddableFoodItem from './AddableFoodItem';

class RecentFoods extends Component {
  render() {
  	let foods;
  	if(this.props.foods) {
  		foods = this.props.foods.map(food => {
  			return (
  				<AddableFoodItem 
  					key={food.foodItemId} 
  					completeItem={food}
  					mealName={this.props.mealName}
						day={this.props.day}
						mealGroupContext={this.props.mealGroupContext} />
				);
  		});
  	}

    return (
      <div className="RecentFoods">
        {foods}
      </div>
    );
  }
}

export default RecentFoods;
