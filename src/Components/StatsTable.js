import React, { Component } from 'react';
import StatsDayItem from './StatsDayItem';
import StatsTotalsRow from './StatsTotalsRow';
import carbsIcon from '../resources/bread-emoji.png';
import fatIcon from '../resources/bacon-strip-emoji.png';
import proteinIcon from '../resources/steak-emoji.png';
import fiberIcon from '../resources/broccoli-emoji.png';
import sugarIcon from '../resources/lollipop-emoji.png';
import sodiumIcon from '../resources/fries-emoji.png';

class StatsTable extends Component {
  render() {
    return (
      <div className="MealGroup StatsTable">
  		<div className="MealGroup__header">
  			<span className="MealGroup__header--macros">
  				<img src={carbsIcon} alt="Carbs" title="Carbs" />
  				<img src={fatIcon} alt="Fat" title="Fat" />
  				<img src={proteinIcon} alt="Protein" title="Protein" />
          <img src={fiberIcon} alt="Fiber" title="Fiber" />
          <img src={sugarIcon} alt="Sugar" title="Sugar" />
          <img src={sodiumIcon} alt="Sodium" title="Sodium" />
  			</span>
  		</div>
  		<StatsDayItem />
      <StatsDayItem />
  		<StatsTotalsRow />
      </div>
    );
  }
}

export default StatsTable;
