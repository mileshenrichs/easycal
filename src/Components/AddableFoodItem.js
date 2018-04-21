import React, { Component } from 'react';
import ServingSelect from './ServingSelect';
import plusIcon from '../resources/plus-icon.png';

class AddableFoodItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      adding: false,
      servingSizes: [
        {
          id: 1,
          unit: 'oz'
        },
        {
          id: 2,
          unit: 'cups'
        },
        {
          id: 3,
          unit: 'whole eggs'
        }
      ]
    }
  }

  handleItemClick(e) {
    let servingInput = document.querySelector('#servingAmt');
    let servingSelect = document.querySelector('#servingUnit');
    let addButton = document.querySelector('.ServingSelect__add-button');
    // don't collapse item if clicked on a form control
    if(servingInput && servingSelect && addButton) {
      if(!servingInput.contains(e.target) && !servingSelect.contains(e.target) && !addButton.contains(e.target)) {
        this.setState(prevState => ({
          adding: !prevState.adding
        }));
      }  
    } else {
      this.setState(prevState => ({
          adding: !prevState.adding
        }));
    }
  }

  render() {
    return (
      <div className={'AddableFoodItem' + (this.state.adding ? ' adding' : '')} onClick={this.handleItemClick.bind(this)}>
      	<img src={plusIcon} alt="Add" className="AddableFoodItem__plus" />
			  <span className="MealItem__food">
	  		<span className="MealItem__food--name">Name</span>
	      <span className="MealItem__food--quantity">
	        5 worms
	      </span>
        </span>
        <span className="MealItem__macros">
          <span className="MealItem__macros--carbs">34</span>
          <span className="MealItem__macros--fat">10</span>
          <span className="MealItem__macros--protein">3</span>
        </span>
	        <span className="MealItem__calories">677</span>
	        <div className="clearfix"></div>
          {this.state.adding && <ServingSelect servingSizes={this.state.servingSizes} />}
      </div> 
    );
  }
}

export default AddableFoodItem;
