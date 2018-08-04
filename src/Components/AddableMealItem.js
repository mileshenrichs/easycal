import React, { Component } from 'react';
import ServingSelect from './ServingSelect';
import plusIcon from '../resources/plus-icon.png';
import editIcon from '../resources/blue-edit-icon.png';
import minusIcon from '../resources/minus-icon.png';
import checkmarkIcon from '../resources/checkmark-icon-blue.png';

class AddableMealItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      hasBeenEdited: false
    };
  }

  handleItemClick() {
    if(this.props.editMode) {
      this.setState({
        isExpanded: true
      });
    }
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
    }
  }

  handleFoodRemoved(mealItemId) {
    this.props.handleMealItemRemoved(this.props.mealItem.id, mealItemId);
  }

  render() {
    let mealItemIcon;
    if(this.props.editMode) {
      mealItemIcon = this.state.isExpanded ? checkmarkIcon : editIcon;
    } else {
      mealItemIcon = plusIcon;
    }

    return (
      <div className={'AddableMealItem' + (this.state.isExpanded ? ' expanded' : '')} onClick={this.handleItemClick.bind(this)}>
        <img src={mealItemIcon} alt="Add" className="addable-item__plus" onClick={this.handleCheckmarkClick.bind(this)} />
        <span className="AddableMealItem__meal-name">{this.props.mealItem.name}</span>
        <div className="clearfix"></div>

        {this.state.isExpanded && 
          <div className="AddableMealItem__food-items">
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
          </div>}
      </div>
    );
  }
}

export default AddableMealItem;