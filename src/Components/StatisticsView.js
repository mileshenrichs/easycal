import React, { Component } from 'react';
import DaySelect from './DaySelect';
import StatsTable from './StatsTable';
import WeekAverages from './WeekAverages';
import ExerciseGraph from './ExerciseGraph';

class StatisticsView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      totals: {
        carbs: 20,
        fat: 30,
        protein: 11,
        calories: 470
      }
    }
  }

  componentDidMount() {
    document.title = 'EasyCal: Statistics';
  }

  render() {
    return (
      <div className="StatisticsView content-container">
        <h1 className="page-title">Nutrition for...</h1>
        <DaySelect />
        <div className="clearfix"></div>

        <StatsTable totals={this.state.totals} item={this.state.item} />
        <WeekAverages />
        <ExerciseGraph />
      </div>
    );
  }
}

export default StatisticsView;
