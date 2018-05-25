import React, { Component } from 'react';
import decodeToken from '../Auth/authUtil';
import deploymentConfig from '../Deployment/deploymentConfig';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { formatDate, parseDate } from 'react-day-picker/moment';
import StatsTable from './StatsTable';
import WeekAverages from './WeekAverages';
import ExerciseGraph from './ExerciseGraph';
import refreshIcon from '../resources/refresh-icon.png';
import refreshIconInactive from '../resources/refresh-icon-inactive.png';
import loaderGray from '../resources/loader-gray.gif';

class StatisticsView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dayFrom: moment(new Date(Date.now() - (60000 * new Date().getTimezoneOffset()))).subtract(1, 'weeks').toDate(),
      dayTo: new Date(Date.now() - (60000 * new Date().getTimezoneOffset())),
      totals: [],
      overallTotals: {},
      averages: {},
      exercise: [],
      goals: {},
      refreshButtonActive: false,
      refreshing: false
    }
  }

  componentDidMount() {
    document.title = 'EasyCal: Statistics';
    window.scrollTo(0, 0);
    const userId = decodeToken(localStorage.getItem('token')).userId;
    fetch(deploymentConfig().apiUrl + '/api/goals/' + userId + '?token=' + localStorage.getItem('token'))
      .then((resp) => resp.json())
      .then(goals => {
        for(var goalCategory in goals) {
          if(goals[goalCategory] === -1) {
            goals[goalCategory] = undefined;
          }
        }
        this.setState({goals: goals});
      });
    this.refreshStats();
  }

  refreshStats() {
    const userId = decodeToken(localStorage.getItem('token')).userId;

    this.setState({refreshing: true});
    fetch(deploymentConfig().apiUrl + '/api/stats?userId=' + userId + '&dateFrom=' + this.state.dayFrom.toISOString() 
      + '&dateTo=' + this.state.dayTo.toISOString() + '&token=' + localStorage.getItem('token'))
      .then(res => {
        if(res.ok) {
          return res.json()
          .then(res => {
            this.setState({
              totals: res.totals,
              overallTotals: res.overallTotals,
              averages: res.averages,
              exercise: res.exercise,
              refreshing: false,
              refreshButtonActive: false
            });
          });
        } else if(res.status === 403) {
          localStorage.removeItem('token');
          window.location.hash = deploymentConfig().baseUrl + '#/login?midreq=true';
        }
      });
  }

  handleFromDayChange(from) {
    this.setState({
      dayFrom: from,
      refreshButtonActive: true
    });
  }

  handleToDayChange(to) {
    this.setState({
      dayTo: to,
      refreshButtonActive: true
    });
  }

  render() {
    let refreshButton;
    if(this.state.refreshing) {
      refreshButton = (
        <img className="StatisticsView__refresh-button refreshing" src={loaderGray} alt="Refreshing..." />
      );
    } else {
      if(this.state.refreshButtonActive) {
        refreshButton = (
          <img className="StatisticsView__refresh-button" src={refreshIcon} onClick={this.refreshStats.bind(this)} alt="Refresh" />
        );
      } else {
        refreshButton = (
          <img className="StatisticsView__refresh-button inactive" src={refreshIconInactive} alt="" />
        );
      }
    }

    return (
      <div className="StatisticsView content-container">
        <h1 className="page-title">Nutrition details:</h1>
        <div className="StatisticsView__week-select">
          From <DayPickerInput value={this.state.dayFrom} formatDate={formatDate} parseDate={parseDate} format="l" onDayChange={this.handleFromDayChange.bind(this)} /> 
          to <DayPickerInput value={this.state.dayTo} formatDate={formatDate} parseDate={parseDate} format="l" onDayChange={this.handleToDayChange.bind(this)}  />
          {refreshButton}
        </div>
        <div className="clearfix"></div>

        <StatsTable 
          totals={this.state.totals}
          overallTotals={this.state.overallTotals} />
        <WeekAverages 
          from={this.state.dayFrom}
          to={this.state.dayTo}
          averages={this.state.averages}
          goals={this.state.goals} />
        <ExerciseGraph 
          from={this.state.dayFrom}
          to={this.state.dayTo}
          totals={this.state.totals}
          exercise={this.state.exercise} />
      </div>
    );
  }
}

export default StatisticsView;
