import React, { Component } from 'react';
import carbsIcon from '../resources/bread-emoji.png';
import fatIcon from '../resources/bacon-strip-emoji.png';
import proteinIcon from '../resources/steak-emoji.png';

class MacroTotals extends Component {
  render() {
    let goalDifferences = {
      carbs: this.props.totalCarbs - this.props.goals.carbs,
      fat: this.props.totalFat - this.props.goals.fat,
      protein: this.props.totalProtein - this.props.goals.protein 
    };

    let carbsDifference;
    if(goalDifferences.carbs > 0) {
      carbsDifference = (
        <span className="MacroTotals__macro--goaldifference over">(+{goalDifferences.carbs})</span>
      );
    } else {
      carbsDifference = (
        <span className="MacroTotals__macro--goaldifference under">({goalDifferences.carbs})</span>
      );
    }

    let fatDifference;
    if(goalDifferences.fat > 0) {
      fatDifference = (
        <span className="MacroTotals__macro--goaldifference over">(+{goalDifferences.fat})</span>
      );
    } else {
      fatDifference = (
        <span className="MacroTotals__macro--goaldifference under">({goalDifferences.fat})</span>
      );
    }

    let proteinDifference;
    if(goalDifferences.protein > 0) {
      proteinDifference = (
        <span className="MacroTotals__macro--goaldifference over">(+{goalDifferences.protein})</span>
      );
    } else {
      proteinDifference = (
        <span className="MacroTotals__macro--goaldifference under">({goalDifferences.protein})</span>
      );
    }

    return (
      <div className="MacroTotals">
  		  <span className="MacroTotals__label">Macros:</span>
  		  <span className="MacroTotals__macro">
  		  	<img src={carbsIcon} alt="Carbs" />
  		  	<span className="MacroTotals__macro--value">{this.props.totalCarbs} g</span>
  		  	{carbsDifference}
  		  </span>
  		  <span className="MacroTotals__macro">
  		  	<img src={fatIcon} alt="Fat" />
  		  	<span className="MacroTotals__macro--value">{this.props.totalFat} g</span>
  		  	{fatDifference}
  		  </span>
  		  <span className="MacroTotals__macro protein">
  		  	<img src={proteinIcon} alt="Protein" />
  		  	<span className="MacroTotals__macro--value">{this.props.totalProtein} g</span>
  		  	{proteinDifference}
  		  </span>
  		  <span className="MacroTotals__caloriesgoal">GOAL: {this.props.goals.calories}</span>
      </div>
    );
  }
}

export default MacroTotals;
