import React, { Component } from 'react';
import ServingSelect from './ServingSelect';
import blueEditIcon from '../resources/blue-edit-icon.png';
import checkmarkIcon from '../resources/checkmark-icon.png';

class MealItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
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

  handleEditClick() {
    this.setState(prevState => ({
      editMode: !prevState.editMode
    }));
  }

  handleSaveClick() {
    this.setState(prevState => ({
      editMode: !prevState.editMode
    }));
  }

  render() {

    let icon;
    if(this.state.editMode) {
      icon = (<img src={checkmarkIcon} alt="save" className="MealItem__save" onClick={this.handleSaveClick.bind(this)} />);
    } else {
      icon = (<img src={blueEditIcon} alt="edit" className="MealItem__edit" onClick={this.handleEditClick.bind(this)} />);
    }

    return (
      <div className={'MealItem' + (this.state.editMode ? ' editing' : '')}>
        {icon}
  		  <span className="MealItem__food">
          <span className="MealItem__food--name">{this.props.item.name}</span>
          <span className="MealItem__food--quantity">
            {this.props.item.servingSize.quantity} 
            {' ' + this.props.item.servingSize.unit + (this.props.item.servingSize.quantity !== 1 ? 's' : '')}
          </span>
        </span>
        <span className="MealItem__macros">
          <span className="MealItem__macros--carbs">{this.props.item.carbs}</span>
          <span className="MealItem__macros--fat">{this.props.item.fat}</span>
          <span className="MealItem__macros--protein">{this.props.item.protein}</span>
        </span>
        <span className="MealItem__calories">{this.props.item.calories}</span>
        <div className="clearfix"></div>
        {this.state.editMode && <ServingSelect servingSizes={this.state.servingSizes} />}
      </div>
    );
  }
}

export default MealItem;
