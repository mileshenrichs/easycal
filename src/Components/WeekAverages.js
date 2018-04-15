import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import carbsIcon from '../resources/bread-emoji.png';
import fatIcon from '../resources/bacon-strip-emoji.png';
import proteinIcon from '../resources/steak-emoji.png';
import fiberIcon from '../resources/broccoli-emoji.png';
import sugarIcon from '../resources/lollipop-emoji.png';
import sodiumIcon from '../resources/fries-emoji.png';

class WeekAverages extends Component {
  render() {
    return (
      <div className="WeekAverages">
        <h2>Weekly Averages</h2>
        <div className="WeekAverages__calories">
          <span>
            <span className="WeekAverages__calories--label">Calories:</span>
            <span className="WeekAverages__calories--value">2,152</span> 
            <span className="WeekAverages__difference">(-48)</span>
          </span>
          <Link to="/me"><span className="WeekAverages__goals-button small-button">my goals</span></Link>
        </div>

        <div className="WeekAverages__table">
          <div className="WeekAverages__nutrient-row">
            <span className="WeekAverages__column left">
              <img src={carbsIcon} alt="Carbs" title="Carbs" />
              <span>291 g <span className="WeekAverages__difference">(+11)</span></span>
            </span>
            <span className="WeekAverages__column right">
              <img src={fiberIcon} alt="Fiber" title="Fiber" />
              <span>22 g <span className="WeekAverages__difference">(+11)</span></span>
            </span>
          </div>
          <div className="WeekAverages__nutrient-row">
            <span className="WeekAverages__column left">
              <img src={fatIcon} alt="Fat" title="Fat" />
              <span>98 g <span className="WeekAverages__difference">(+11)</span></span>
            </span>
            <span className="WeekAverages__column right">
              <img src={sugarIcon} alt="Sugar" title="Sugar" />
              <span>73 g <span className="WeekAverages__difference">(+11)</span></span>
            </span>
          </div>
          <div className="WeekAverages__nutrient-row">
            <span className="WeekAverages__column left">
              <img src={proteinIcon} alt="Protein" title="Protein" />
              <span>144 g <span className="WeekAverages__difference">(+11)</span></span>
            </span>
            <span className="WeekAverages__column right">
              <img src={sodiumIcon} alt="Sodium" title="Sodium" />
              <span>2246 mg <span className="WeekAverages__difference">(+11)</span></span>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default WeekAverages;
