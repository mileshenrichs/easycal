import React, { Component } from 'react';
import AddableMealItem from './AddableMealItem';
import tacoEmoji from '../resources/taco-emoji.png';

class CreateMealItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createItemMode: false
    };
  }

  onCreateButtonClicked() {
    this.setState({
      createItemMode: true
    });
    this.props.onCreateMealItemClicked();
  }

  render() {
    return (
      <div className="CreateMealItem">
        {!this.state.createItemMode && 
          <button className="CreateMealItem__create-button" onClick={this.onCreateButtonClicked.bind(this)}>
            <img src={tacoEmoji} alt="" />
            <span>Create a new meal</span>
          </button>}

        {this.state.createItemMode && 
          <AddableMealItem
            creatingNewItem
            mealItem={this.props.mealItem}
            editMode={true}
            handleDefaultQuantityChange={this.props.handleDefaultQuantityChange}
            handleDefaultServingChange={this.props.handleDefaultServingChange}
            handleMealItemRemoved={this.props.handleMealItemRemoved}
            handleNewMealItemNameChange={this.props.handleNewMealItemNameChange}
            updateMeal={this.props.updateMeal}
          />}
      </div>
    );
  }
}

export default CreateMealItem;