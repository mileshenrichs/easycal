import React, { Component } from 'react';
import AddableFoodItem from './AddableFoodItem';

class MyFoods extends Component {

  componentDidMount() {
    this.props.getFoods();
  }

  deleteUserFoodItem(foodItemId) {
    this.props.deleteUserFoodItem(foodItemId);
  }

  render() {
    let foods;
    if(this.props.foods.length) {
      foods = this.props.foods.map(food => {
        return (
          <AddableFoodItem 
            key={food.foodItemId} 
            completeItem={food}
            mealName={this.props.mealName}
            day={this.props.day} 
            editMode={this.props.editMode}
            deleteUserFoodItem={this.deleteUserFoodItem.bind(this)} 
            mealGroupContext={this.props.mealGroupContext} />
        );
      });
    } else {
      foods = (
        <span className="MyFoods__no-foods">Looks like you haven't created any foods yet.</span>
      );
    }
    return (
      <div className="MyFoods">
        {foods}
      </div>
    );
  }
}

export default MyFoods;
