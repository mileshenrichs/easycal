import React, { Component } from 'react';
import decodeToken from '../Auth/authUtil';
import deploymentConfig from '../Deployment/deploymentConfig';
import update from 'immutability-helper';
import ServingSelect from './ServingSelect';
import ItemDeleteButton from './ItemDeleteButton';
import plusIcon from '../resources/plus-icon.png';
import loadingSpinner from '../resources/spinning-loader.gif';
import trashIcon from '../resources/trash-icon.png';

class AddableFoodItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      adding: false,
      item: this.props.completeItem ? this.props.completeItem : undefined,
      loading: false,
      deleting: false
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
    if(!this.props.editMode) { // if not in edit mode, get item details for ServingSelect
      if(!this.state.adding && !this.state.item) {
        this.setState({loading: true});
        fetch(deploymentConfig().apiUrl + '/api/foods/' + this.props.item.foodItemId)
        .then((resp) => resp.json())
        .then(item => {
          let processedItem = this.setDefaultServingQuantity(item);
          this.setState({
            adding: true,
            item: processedItem,
            loading: false
          })
        });
      } else {
        this.setState(prevState => ({
          adding: !prevState.adding
        }));
      }
    } else { // if in edit mode, activate deleting state
      this.setState(prevState => ({
        deleting: !prevState.deleting
      }));
    }
  }

  /**
   * Sets initial serving quantity for 100 g for foods whose only
   * serving size is 1 gram
  */
  setDefaultServingQuantity(item) {
    if(item.selectedServing.servingSize.label === 'g' && item.selectedServing.quantity === 1) {
      item.selectedServing.quantity = 100;
    }
    return item;
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
    const userId = decodeToken(localStorage.getItem('token')).userId;

    let consumption = JSON.parse(JSON.stringify(this.state.item));
    consumption.userId = userId;
    consumption.meal = this.props.mealName;
    consumption.day = this.props.day;

    const reqObj = {
      consumption: consumption,
      token: localStorage.getItem('token')
    }
    fetch(deploymentConfig().apiUrl + '/api/consumptions', {
      method: 'POST',
      body: JSON.stringify(reqObj)
    })
    .then(res => {
      if(res.ok) {
        window.location = deploymentConfig().baseUrl + '/?day=' + this.props.day;
      } else if(res.status === 403) {
        localStorage.removeItem('token');
        window.location = deploymentConfig().baseUrl + '/login?midreq=true';
      } else {
        alert('There was a problem adding this food to your log.');
      }
    })
  }

  deleteUserFoodItem() {
    this.props.deleteUserFoodItem(this.state.item.foodItemId);
  }

  render() {
    let foodName;
    if(this.props.completeItem) {
      foodName = this.state.item.name;
    } else if(this.props.item) {
      foodName = this.props.item.name;
    } else {
      foodName = 'Name';
    }

    let itemTotals;
    if(this.state.item) {
      itemTotals = this.calculateItemTotals();
    }

    // set plus icon if in loading/editing state
    let plusButtonImg;
    if(this.props.editMode) {
      plusButtonImg = trashIcon;
    } else {
      plusButtonImg = this.state.loading ? loadingSpinner : plusIcon
    }

    return (
      <div className={'AddableFoodItem' + (this.state.adding ? ' adding' : '') + (this.state.deleting ? ' deleting' : '')} onClick={this.handleItemClick.bind(this)}>
      	<img src={plusButtonImg} alt="Add" className="AddableFoodItem__plus" />
			  <span className="MealItem__food">
	  		 <span className="MealItem__food--name">{foodName}</span>
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

        {this.state.deleting && 
          <ItemDeleteButton deleteItem={this.deleteUserFoodItem.bind(this)} />}
      </div> 
    );
  }
}

export default AddableFoodItem;
