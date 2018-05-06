import React, { Component } from 'react';
import update from 'immutability-helper';
import ServingSelect from './ServingSelect';
import plusIcon from '../resources/plus-icon.png';
import loadingSpinner from '../resources/spinning-loader.gif';

class AddableFoodItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      adding: false,
      item: undefined,
      loading: false
    }
  }

  handleSizeChange(newServingSizeId) {
    let newServingSize = this.state.item.servingSizes.find(servingSize => servingSize.id === newServingSizeId);
    
    let newState = update(this.state, {
      item: {
        selectedServing: {
          servingSize: {$set: newServingSize}
        }
      }
    });
    this.setState(newState);
  }

  handleQuantityChange(newServingQuantity) {
    let newState = update(this.state, {
      item: {
        selectedServing: {
          quantity: {$set: newServingQuantity}
        }
      }
    });
    this.setState(newState);
  }

  handleItemClick(e) {
    if(!this.state.adding && !this.state.item) {
      this.setState({loading: true});
      fetch('/api/foods/' + this.props.item.foodItemId)
      .then((resp) => resp.json())
      .then(item => {
        this.setState({
          adding: true,
          item: item,
          loading: false
        })
      });
    } else {
      this.setState(prevState => ({
        adding: !prevState.adding
      }));
    }
  }

  calculateItemTotals() {
    let item = this.state.item;
    let totalCals, totalCarbs, totalFat, totalProtein;
    totalCals = totalCarbs = totalFat = totalProtein = 0;
    let servingSizeMultiplier = item.selectedServing.quantity * item.selectedServing.servingSize.ratio;

    totalCals += Math.round(item.calories * servingSizeMultiplier);
    totalCarbs += Math.round(item.carbs * servingSizeMultiplier);
    totalFat += Math.round(item.fat * servingSizeMultiplier);
    totalProtein += Math.round(item.protein * servingSizeMultiplier);
    return {
      calories: totalCals,
      carbs: totalCarbs,
      fat: totalFat,
      protein: totalProtein
    };
  }

  addConsumption() {
    let consumption = JSON.parse(JSON.stringify(this.state.item));
    consumption.userId = 1;
    consumption.meal = this.props.mealName;
    fetch('/api/consumptions', {
      method: 'POST',
      body: JSON.stringify(consumption)
    })
    .then(res => {
      if(res.ok) {
        window.location = '/';
      } else {
        alert('There was a problem adding this food to your log.');
      }
    })
  }

  render() {
    let itemTotals;
    if(this.state.item) {
      itemTotals = this.calculateItemTotals();
    }

    let plusButtonImg = this.state.loading ? loadingSpinner : plusIcon;

    return (
      <div className={'AddableFoodItem' + (this.state.adding ? ' adding' : '')} onClick={this.handleItemClick.bind(this)}>
      	<img src={plusButtonImg} alt="Add" className="AddableFoodItem__plus" />
			  <span className="MealItem__food">
	  		 <span className="MealItem__food--name">{this.props.item ? this.props.item.name : 'Name'}</span>
        </span>

        {this.state.item && 
          <span>
            <span className="MealItem__macros">
              <span className="MealItem__macros--carbs">{itemTotals.carbs}</span>
              <span className="MealItem__macros--fat">{itemTotals.fat}</span>
              <span className="MealItem__macros--protein">{itemTotals.protein}</span>
            </span>
            <span className="MealItem__calories">{itemTotals.calories}</span>
          </span>
        }
        <div className="clearfix"></div>

        {this.state.adding && this.state.item && 
          <ServingSelect 
            selectedServing={this.state.item.selectedServing}
            servingSizes={this.state.item.servingSizes} 
            itemId={this.state.item.foodItemId}
            handleQuantityChange={this.handleQuantityChange.bind(this)}
            handleSizeChange={this.handleSizeChange.bind(this)}
            handleAddClick={this.addConsumption.bind(this)}
          /> }
      </div> 
    );
  }
}

export default AddableFoodItem;
