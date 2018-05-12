import React, { Component } from 'react';
import update from 'immutability-helper';
import AddableFoodItem from './AddableFoodItem';

class MyFoods extends Component {

  constructor(props) {
    super(props);
    this.state = {
      foods: []
    }
  }

  componentDidMount() {
    // get user foods
    fetch('/api/foods/user/1')
      .then((resp) => resp.json())
      .then(userFoods => {
        this.setState({foods: userFoods});
      });
  }

  deleteUserFoodItem(foodItemId) {
    fetch('/api/foods/' + foodItemId, {method: 'DELETE'})
      .then(res => {
        if(res.ok) {
          let foodItem = this.state.foods.find(food => food.foodItemId === foodItemId);
          let foodItemIndex = this.state.foods.indexOf(foodItem);
          let newState = update(this.state, {
            foods: {$splice: [[foodItemIndex, 1]]}
          });
          this.setState(newState);
        } else {
          alert('This food item could not be deleted.');
        }
      });
  }

  render() {
    let foods;
    if(this.state.foods) {
      foods = this.state.foods.map(food => {
        return (
          <AddableFoodItem 
            key={food.foodItemId} 
            completeItem={food}
            mealName={this.props.mealName}
            day={this.props.day} 
            editMode={this.props.editMode}
            deleteUserFoodItem={this.deleteUserFoodItem.bind(this)} />
        );
      });
    }
    return (
      <div className="MyFoods">
        {foods}
      </div>
    );
  }
}

export default MyFoods;
