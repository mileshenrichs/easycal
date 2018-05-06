import React, { Component } from 'react';
import update from 'immutability-helper';
import MealItem from './MealItem';
import AddFoodItem from './AddFoodItem';
import MealTotalsRow from './MealTotalsRow';
import editIcon from '../resources/edit-icon.png';
import carbsIcon from '../resources/bread-emoji.png';
import fatIcon from '../resources/bacon-strip-emoji.png';
import proteinIcon from '../resources/steak-emoji.png';

class MealGroup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({items: nextProps.items});
  }

  /**
   * Update current serving size information within context of MealGroup 
   * (will be propagated up to DayView when checkmark clicked)
  */
  handleSizeChange(newServingSizeId, consumptionId) {
    let mealItem = this.state.items.find(item => item.consumptionId === consumptionId);
    let mealItemIndex = this.state.items.indexOf(mealItem);
    let newServingSize = mealItem.servingSizes.find(servingSize => servingSize.id === newServingSizeId);
    
    let newState = update(this.state, {
      items: {
        [mealItemIndex]: {
          selectedServing: {
            servingSize: {$set: newServingSize}
          }
        }
      }
    });
    this.setState(newState);
  }

  handleQuantityChange(newServingQuantity, consumptionId) {
    let mealItem = this.state.items.find(item => item.consumptionId === consumptionId);
    let mealItemIndex = this.state.items.indexOf(mealItem);
    
    let newState = update(this.state, {
      items: {
        [mealItemIndex]: {
          selectedServing: {
            quantity: {$set: newServingQuantity}
          }
        }
      }
    });
    this.setState(newState);
  }

  calculateItemTotals() {
    let totalCals, totalCarbs, totalFat, totalProtein;
    totalCals = totalCarbs = totalFat = totalProtein = 0;
    this.state.items.forEach(item => {
      let servingSizeMultiplier = item.selectedServing.quantity * item.selectedServing.servingSize.ratio;

      totalCals += Math.round(item.calories * servingSizeMultiplier);
      totalCarbs += Math.round(item.carbs * servingSizeMultiplier);
      totalFat += Math.round(item.fat * servingSizeMultiplier);
      totalProtein += Math.round(item.protein * servingSizeMultiplier);
    });
    return {
      calories: totalCals,
      carbs: totalCarbs,
      fat: totalFat,
      protein: totalProtein
    };
  }

  handleNewServingSave() {
    // pass cloned state object up to DayView
    this.props.handleServingUpdate(JSON.parse(JSON.stringify(this.state)), this.props.type.toLowerCase());
  }

  handleItemRemove(consumptionId) {
    this.props.handleItemRemove(consumptionId);
  }

  render() {

    let itemTotals = this.calculateItemTotals();

  	let mealItems;
  	if(this.state.items) {
  		mealItems = this.state.items.map(item => {

        let servingSizeMultiplier = item.selectedServing.quantity * item.selectedServing.servingSize.ratio;
        let nutritionValues = {
          carbs: Math.round(item.carbs * servingSizeMultiplier),
          fat: Math.round(item.fat * servingSizeMultiplier),
          protein: Math.round(item.protein * servingSizeMultiplier),
          calories: Math.round(item.calories * servingSizeMultiplier)
        };

  			return (
  				<MealItem 
            key={item.consumptionId} 
            foodItemId={item.foodItemId}
            consumptionId={item.consumptionId}
            name={item.name}
            nutritionValues={nutritionValues}
            selectedServing={item.selectedServing}
            servingSizes={item.servingSizes}
            handleQuantityChange={this.handleQuantityChange.bind(this)}
            handleSizeChange={this.handleSizeChange.bind(this)}
            handleNewServingSave={this.handleNewServingSave.bind(this)}
            handleItemRemove={this.handleItemRemove.bind(this)}
            removingItem={this.props.removingItem}
          />
				);
  		});
  	}

    return (
      <div className="MealGroup">
  		<div className="MealGroup__header">
  			<img src={editIcon} alt="Edit" className="MealGroup__header--edit" />
  			<span className="MealGroup__header--type">{this.props.type}</span>
  			<span className="MealGroup__header--macros">
  				<img src={carbsIcon} alt="Carbs" title="Carbs" />
  				<img src={fatIcon} alt="Fat" title="Fat" />
  				<img src={proteinIcon} alt="Protein" title="Protein" />
  			</span>
  			<span className="MealGroup__header--caltotal">
  				{itemTotals.calories ? itemTotals.calories : '--'}
  			</span>
  		</div>
  		{mealItems}
  		<AddFoodItem meal={this.props.type} day={this.props.day} />
  		{this.props.items.length > 0 && 
        <MealTotalsRow 
          totals={itemTotals} />}
      </div>
    );
  }
}

export default MealGroup;
