import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import deploymentConfig from '../Deployment/deploymentConfig';
import carbsIcon from '../resources/bread-emoji.png';
import fatIcon from '../resources/bacon-strip-emoji.png';
import proteinIcon from '../resources/steak-emoji.png';
import fiberIcon from '../resources/broccoli-emoji.png';
import sugarIcon from '../resources/lollipop-emoji.png';
import sodiumIcon from '../resources/fries-emoji.png';

class WeekAverages extends Component {
  render() {
    let goalDifferences;
    if(this.props.goals) {
      goalDifferences = {
        calories: this.props.goals.calories ? (this.props.averages.calories - this.props.goals.calories) : undefined,
        carbs: this.props.goals.carbs ? (this.props.averages.carbs - this.props.goals.carbs) : undefined,
        fat: this.props.goals.fat ? (this.props.averages.fat - this.props.goals.fat) : undefined,
        protein: this.props.goals.protein ? (this.props.averages.protein - this.props.goals.protein) : undefined,
        fiber: this.props.goals.fiber ? (this.props.averages.fiber - this.props.goals.fiber) : undefined,
        sugar: this.props.goals.sugar ? (this.props.averages.sugar - this.props.goals.sugar) : undefined,
        sodium: this.props.goals.sodium ? (this.props.averages.sodium - this.props.goals.sodium) : undefined
      };
    }

    return (
      <div className="WeekAverages">
        <h2>Averages ({moment(this.props.from).format('l')} – {moment(this.props.to).format('l')})</h2>
        <div className="WeekAverages__calories">
          <span>
            <span className="WeekAverages__calories--label">Calories:</span>
            <span className="WeekAverages__calories--value">{new Intl.NumberFormat().format(this.props.averages.calories)}</span> 
            {goalDifferences.calories && 
              <span className="WeekAverages__difference">({(goalDifferences.calories >= 0 ? '+' : '') + goalDifferences.calories})</span>}
          </span>
          <Link to={deploymentConfig().baseUrl + "/me"}><span className="WeekAverages__goals-button small-button">my goals</span></Link>
        </div>

        <div className="WeekAverages__table">
          <div className="WeekAverages__nutrient-row">
            <span className="WeekAverages__column left">
              <img src={carbsIcon} alt="Carbs" title="Carbs" />
              <span>
                {this.props.averages.carbs} g 
                {goalDifferences.carbs && 
                  <span className="WeekAverages__difference">({(goalDifferences.carbs >= 0 ? '+' : '') + goalDifferences.carbs})</span>}
              </span>
            </span>
            <span className="WeekAverages__column right">
              <img src={fiberIcon} alt="Fiber" title="Fiber" />
              <span>
                {this.props.averages.fiber} g 
                {goalDifferences.fiber && 
                  <span className="WeekAverages__difference">({(goalDifferences.fiber >= 0 ? '+' : '') + goalDifferences.fiber})</span>}
              </span>
            </span>
          </div>
          <div className="WeekAverages__nutrient-row">
            <span className="WeekAverages__column left">
              <img src={fatIcon} alt="Fat" title="Fat" />
              <span>
                {this.props.averages.fat} g 
                {goalDifferences.fat && 
                  <span className="WeekAverages__difference">({(goalDifferences.fat >= 0 ? '+' : '') + goalDifferences.fat})</span>}
              </span>
            </span>
            <span className="WeekAverages__column right">
              <img src={sugarIcon} alt="Sugar" title="Sugar" />
              <span>
                {this.props.averages.sugar} g 
                {goalDifferences.sugar && 
                  <span className="WeekAverages__difference">({(goalDifferences.sugar >= 0 ? '+' : '') + goalDifferences.sugar})</span>}
              </span>
            </span>
          </div>
          <div className="WeekAverages__nutrient-row">
            <span className="WeekAverages__column left">
              <img src={proteinIcon} alt="Protein" title="Protein" />
              <span>
                {this.props.averages.protein} g 
                {goalDifferences.protein && 
                  <span className="WeekAverages__difference">({(goalDifferences.protein >= 0 ? '+' : '') + goalDifferences.protein})</span>}
              </span>
            </span>
            <span className="WeekAverages__column right">
              <img src={sodiumIcon} alt="Sodium" title="Sodium" />
              <span>
                {this.props.averages.sodium} mg 
                {goalDifferences.sodium && 
                  <span className="WeekAverages__difference">({(goalDifferences.sodium >= 0 ? '+' : '') + goalDifferences.sodium})</span>}
              </span>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default WeekAverages;
