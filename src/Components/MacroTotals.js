import React, { Component } from 'react';
import carbsIcon from '../resources/bread-emoji.png';
import fatIcon from '../resources/bacon-strip-emoji.png';
import proteinIcon from '../resources/steak-emoji.png';

class MacroTotals extends Component {
  render() {
    return (
      <div className="MacroTotals">
  		  <span className="MacroTotals__label">Macros:</span>
  		  <span className="MacroTotals__macro">
  		  	<img src={carbsIcon} alt="Carbs" />
  		  	<span className="MacroTotals__macro--value">27 g</span>
  		  	<span className="MacroTotals__macro--goaldifference">(-138)</span>
  		  </span>
  		  <span className="MacroTotals__macro">
  		  	<img src={fatIcon} alt="Fat" />
  		  	<span className="MacroTotals__macro--value">56 g</span>
  		  	<span className="MacroTotals__macro--goaldifference">(+16)</span>
  		  </span>
  		  <span className="MacroTotals__macro protein">
  		  	<img src={proteinIcon} alt="Protein" />
  		  	<span className="MacroTotals__macro--value">38 g</span>
  		  	<span className="MacroTotals__macro--goaldifference">(-96)</span>
  		  </span>
  		  <span className="MacroTotals__caloriesgoal">GOAL: 2200</span>
      </div>
    );
  }
}

export default MacroTotals;
