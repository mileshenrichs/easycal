import React, { Component } from 'react';
import MealItem from './MealItem';
import AddFoodItem from './AddFoodItem';
import MealTotalsRow from './MealTotalsRow';
import editIcon from '../resources/edit-icon.png';
import carbsIcon from '../resources/bread-emoji.png';
import fatIcon from '../resources/bacon-strip-emoji.png';
import proteinIcon from '../resources/steak-emoji.png';

class MealGroup extends Component {

  render() {

  	let mealItems;
  	if(this.props.items) {
  		mealItems = this.props.items.map(item => {
  			return (
  				<MealItem key={item.id} item={item} />
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
  				{this.props.totals.calories ? this.props.totals.calories : '--'}
  			</span>
  		</div>
  		{mealItems}
  		<AddFoodItem />
  		{this.props.items.length > 0 && <MealTotalsRow totals={this.props.totals} />}
      </div>
    );
  }
}

export default MealGroup;
