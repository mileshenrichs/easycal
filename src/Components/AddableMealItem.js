import React, { Component } from 'react';
import decodeToken from '../Auth/authUtil';
import deploymentConfig from '../Deployment/deploymentConfig';
import { Link } from 'react-router-dom';
import ServingSelect from './ServingSelect';
import plusIcon from '../resources/plus-icon.png';
import editIcon from '../resources/blue-edit-icon.png';
import minusIcon from '../resources/minus-icon.png';
import trashIcon from '../resources/trash-icon.png';
import checkmarkIcon from '../resources/checkmark-icon-blue.png';

class AddableMealItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      hasBeenEdited: false
    };
  }

  componentDidMount() {
    if(this.props.creatingNewItem) {
      this.setState({
        isExpanded: true,
        hasBeenEdited: true
      });
    }
  }

  handleItemClick() {
    if(this.props.editMode) {
      this.setState({
        isExpanded: true
      });
    } else {
      this.addFoodItemsAsConsumptions();
    }
  }

  addFoodItemsAsConsumptions() {
    const userId = decodeToken(localStorage.getItem('token')).userId;
    const consumption = {
      mealGroupId: this.props.mealItem.id,
      userId,
      meal: this.props.mealName,
      day: this.props.day
    }
    const reqObj = {consumption};

    fetch(deploymentConfig().apiUrl + '/api/consumptions/food-meal-group?token=' + localStorage.getItem('token'), {
      method: 'POST',
      body: JSON.stringify(reqObj)
    })
    .then(res => {
      if(res.ok) {
        window.location.hash = deploymentConfig().baseUrl + '#/?day=' + this.props.day;
      } else if(res.status === 403) {
        localStorage.removeItem('token');
        window.location.hash = deploymentConfig().baseUrl + '#/login?midreq=true';
      } else {
        alert('There was a problem adding this meal to your log.');
      }
    })
  }

  getServingAsObject(mealGroupItem) {
    return {
      servingSize: mealGroupItem.defaultServingSize,
      quantity: mealGroupItem.defaultServingQuantity
    }
  }

  handleDefaultQuantityChange(mealItemId, newQuantity) {
    const quantityAsNumber = parseFloat(newQuantity);
    if(!isNaN(quantityAsNumber)) {
      this.props.handleDefaultQuantityChange(this.props.mealItem.id, mealItemId, quantityAsNumber);
      this.setState({hasBeenEdited: true});
    }
  }

  handleDefaultSizeChange(mealItemId, newServingSizeId) {
    this.props.handleDefaultServingChange(this.props.mealItem.id, mealItemId, newServingSizeId);
    this.setState({hasBeenEdited: true});
  }

  handleCheckmarkClick(e) {
    e.stopPropagation();
    // if item is expanded in edit mode, perform an update
    if(this.props.editMode && this.state.isExpanded) {
      this.setState({
        isExpanded: false
      });
      // only update if meal has been edited
      if(this.state.hasBeenEdited) {
        this.props.updateMeal(this.props.mealItem.id);
      }
      // reset edited state once meal has been updated
      this.setState({hasBeenEdited: false});
    }
  }

  handleFoodRemoved(mealItemId) {
    this.props.handleMealItemRemoved(this.props.mealItem.id, mealItemId);
    this.setState({hasBeenEdited: true});
  }

  getMealNameText(mealItemName) {
    return mealItemName ? mealItemName : '(unnamed meal)';
  }

  handleDeleteClick() {
    if(window.confirm('Are you sure you want to delete this meal?')) {
      this.props.deleteMealItem(this.props.mealItem.id);
    }
  }

  render() {
    const currentLocation = window.location.hash.substring(1);

    let mealItemIcon;
    if(this.props.editMode) {
      mealItemIcon = this.state.isExpanded ? checkmarkIcon : editIcon;
    } else {
      mealItemIcon = plusIcon;
    }

    let showOrSetMealName;
    if(!this.props.creatingNewItem && !(this.state.isExpanded && this.props.editMode)) {
      showOrSetMealName = (
        <span className="AddableMealItem__meal-name">{this.getMealNameText(this.props.mealItem.name)}</span>
      );
    } else {
      if(this.props.creatingNewItem) {
        showOrSetMealName = (
          <span className="AddableMealItem__meal-name">
            <input type="text" className="AddableMealItem__meal-name--input" placeholder="Meal name"
                    value={this.props.mealItem.name} onChange={(e) => this.props.handleNewMealItemNameChange(e.target.value)} />
          </span>
        );
      } else {
        showOrSetMealName = (
          <span className="AddableMealItem__meal-name">
            <input type="text" className="AddableMealItem__meal-name--input" placeholder="Meal name"
                    value={this.props.mealItem.name} 
                    onChange={(e) => this.props.handleExistingMealItemNameChange(this.props.mealItem.id, e.target.value)} />
          </span>
        );
      }
    }

    let foodItemsList;
    if(this.props.mealItem.mealGroupItems.length) {
      foodItemsList = (
        <div className="items">
          {this.props.mealItem.mealGroupItems.map(mealItem => (
            <div className="food-item-row" key={mealItem.id}>
              <img src={minusIcon} alt="remove" onClick={() => this.handleFoodRemoved(mealItem.id)} />
              <span className="food-item-row--food-name">{mealItem.foodItem.name}</span>

              <ServingSelect 
                selectedServing={this.getServingAsObject(mealItem)}
                servingSizes={mealItem.foodItem.servingSizes} 
                itemId={mealItem.foodItem.id}
                handleQuantityChange={(quantity) => this.handleDefaultQuantityChange(mealItem.id, quantity)}
                handleSizeChange={(servingSizeId) => this.handleDefaultSizeChange(mealItem.id, servingSizeId)}
              />
            </div>
          ))}
        </div>
      );
    } else {
      foodItemsList = (
        <span className="AddableMealItem__no-food-items-message">
          Foods that are part of this meal will appear here.<br /> 
          <b>Click the button below to start adding foods!</b>
        </span>
      );
    }

    return (
      <div className={'AddableMealItem' + ((this.props.editMode && this.state.isExpanded) || this.props.creatingNewItem ? ' expanded' : '')} 
            onClick={this.handleItemClick.bind(this)}>
        <img src={mealItemIcon} alt="Add" className="addable-item__plus" onClick={this.handleCheckmarkClick.bind(this)} />
        {this.state.isExpanded && this.props.editMode && 
          <img src={trashIcon} alt="Delete" className="addable-item__delete" onClick={this.handleDeleteClick.bind(this)} />}
        {showOrSetMealName}
        <div className="clearfix"></div>

        {this.props.editMode && this.state.isExpanded && 
          <div className="AddableMealItem__food-items">
            {foodItemsList}
            <Link to={currentLocation + '&mealgroupctx=' + this.props.mealItem.id} className="AddableMealItem__add-foods-button">
              <img src={plusIcon} alt="" />
              <span>Add Foods</span>
            </Link>
          </div>}
      </div>
    );
  }
}

export default AddableMealItem;