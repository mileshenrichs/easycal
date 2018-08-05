import React, { Component } from 'react';
import update from 'immutability-helper';
import decodeToken from '../Auth/authUtil';
import deploymentConfig from '../Deployment/deploymentConfig';
import AddableMealItem from './AddableMealItem';
import CreateMealItem from './CreateMealItem';

class MyMeals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: [],
      mealItemToCreate: {
        name: '',
        mealGroupItems: []
      }
    }
  }

  componentDidMount() {
    this.getUserMeals();
  }

  handleDefaultQuantityChange(mealId, mealGroupItemId, newQuantity) {
    const { mealIdx, mealGroupItemIdx } = this.findMealAndGroupItem(mealId, mealGroupItemId);

    const newState = update(this.state, {
      meals: {
        [mealIdx]: {
          mealGroupItems: {
            [mealGroupItemIdx]: {
              defaultServingQuantity: {$set: newQuantity}
            }
          }
        }
      }
    });
    this.setState(newState);
  }

  handleDefaultServingChange(mealId, mealGroupItemId, newServingSizeId) {
    const { mealIdx, mealGroupItem, mealGroupItemIdx } = this.findMealAndGroupItem(mealId, mealGroupItemId);
    const newDefaultServingSize = mealGroupItem.foodItem.servingSizes.find(servingSize => servingSize.id === newServingSizeId);

    const newState = update(this.state, {
      meals: {
        [mealIdx]: {
          mealGroupItems: {
            [mealGroupItemIdx]: {
              defaultServingSize: {$set: newDefaultServingSize}
            }
          }
        }
      }
    });
    this.setState(newState);
  }

  getUserMeals() {
    const userId = decodeToken(localStorage.getItem('token')).userId;

		// get user meals
    fetch(deploymentConfig().apiUrl + '/api/food-meal-groups/user/' + userId + '?token=' + localStorage.getItem('token'))
      .then((resp) => resp.json())
      .then(userMeals => {
        this.setState({meals: userMeals});
      });
  }

  updateMeal(mealId) {
    const updatedMeal = this.state.meals.find(meal => meal.id === mealId);

    fetch(deploymentConfig().apiUrl + '/api/food-meal-groups/update?token=' + localStorage.getItem('token'), {
      method: 'POST',
      body: JSON.stringify(updatedMeal)
    }).then(res => {
      if(!res.ok) {
        alert('Could not update meal.');
      }
    });
  }

  handleMealItemRemoved(mealId, mealGroupItemId) {
    const { mealIdx, mealGroupItemIdx } = this.findMealAndGroupItem(mealId, mealGroupItemId);

    const newState = update(this.state, {
      meals: {
        [mealIdx]: {
          mealGroupItems: {$splice: [[mealGroupItemIdx, 1]]}
        }
      }
    });
    this.setState(newState);
  }

  findMealAndGroupItem(mealId, mealGroupItemId) {
    const meal = this.state.meals.find(meal => meal.id === mealId);
    const mealIdx = this.state.meals.indexOf(meal);
    const mealGroupItem = meal.mealGroupItems.find(groupItem => groupItem.id === mealGroupItemId);
    const mealGroupItemIdx = meal.mealGroupItems.indexOf(mealGroupItem);

    return {meal, mealIdx, mealGroupItem, mealGroupItemIdx};
  }

  handleNewMealItemNameChange(itemName) {
    this.setState({
      mealItemToCreate: {
        ...this.state.mealItemToCreate,
        name: itemName
      }
    });
  }

  render() {
    return (
      <div className={'MyMeals' + (this.props.editMode ? ' edit-mode' : '')}>
        {this.state.meals.map(meal => (
          <AddableMealItem
            key={meal.id}
            mealItem={meal}
            editMode={this.props.editMode}
            handleDefaultQuantityChange={this.handleDefaultQuantityChange.bind(this)}
            handleDefaultServingChange={this.handleDefaultServingChange.bind(this)}
            handleMealItemRemoved={this.handleMealItemRemoved.bind(this)}
            updateMeal={this.updateMeal.bind(this)}
          />
        ))}

        <CreateMealItem 
          mealItem={this.state.mealItemToCreate}
          handleDefaultQuantityChange={this.handleDefaultQuantityChange.bind(this)}
          handleDefaultServingChange={this.handleDefaultServingChange.bind(this)}
          handleMealItemRemoved={this.handleMealItemRemoved.bind(this)}
          handleNewMealItemNameChange={this.handleNewMealItemNameChange.bind(this)}
          updateMeal={this.updateMeal.bind(this)}
        />
      </div>
    );
  }
}

export default MyMeals;