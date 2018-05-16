import React, { Component } from 'react';
import Highcharts from 'react-highcharts';
import update from 'immutability-helper';
import moment from 'moment';

class ExerciseGraph extends Component {

  constructor(props) {
    super(props);
    this.state = {
      graphConfig: {
        title: {
          text: 'Exercise and Food Consumption'
        },
        xAxis: {
          type: 'datetime',
          dateTimeLabelFormats: {
            day: '%b %e'
          }
        },
        yAxis: {
          title: {
            text: 'Calories Burned/Eaten'
          }
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle'
        },

        plotOptions: {
          series: {
            label: {
              connectorAllowed: false
            },
            pointStart: Date.UTC(2010, 0, 1),
            pointInterval: 24 * 3600 * 1000 // one day
          }
        },

        series: [{
          name: 'Calories Eaten',
          data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
          color: '#c22317'
          }, {
          name: 'Calories Burned',
          data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111],
          color: '#08ae23'
        }],
        credits: false
      }
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let {from, to, totals, exercise} = nextProps;
    let {caloriesEaten, caloriesBurned} = ExerciseGraph.buildSeries(from, to, totals, exercise);

    return update(prevState, {
      graphConfig: {
        plotOptions: {
          series: {
            pointStart: {$set: ExerciseGraph.convertDate(nextProps.from)}
          }
        },
        series: {
          0: {
            data: {$set: caloriesEaten}
          },
          1: {
            data: {$set: caloriesBurned}
          }
        }
      }
    });
  }

  static buildSeries(dayFrom, dayTo, totals, exercise) {
    let numberOfDays = moment(ExerciseGraph.convertDate(dayTo)).diff(moment(ExerciseGraph.convertDate(dayFrom)), 'days');
    // start series with a 0 (for some reason Highcharts doesn't display first element)
    let caloriesEatenSeries = [0];
    let caloriesBurnedSeries = [0];

    for(var i = 0; i <= numberOfDays; i++) {
      let currentDay = moment(dayFrom).add(i, 'days').format('YYYY-MM-DD');

      let totalsForDay = totals.find(t => t.day === currentDay);
      caloriesEatenSeries.push(totalsForDay ? totalsForDay.calories : 0);

      let exerciseForDay = exercise.find(e => e.day === currentDay);
      caloriesBurnedSeries.push(exerciseForDay ? exerciseForDay.caloriesBurned : 0);
    }

    return {
      caloriesEaten: caloriesEatenSeries,
      caloriesBurned: caloriesBurnedSeries
    };
  }

  static convertDate(date) {
    // clone date object
    let processedDate = new Date(date.getTime());

    // set date to beginning of day in client timezone
    processedDate = moment(processedDate).hour(0).minute(0).second(0).millisecond(0).toDate();

    // subtract timezone offset to get true beginning of day
    processedDate = new Date(processedDate - (60000 * new Date().getTimezoneOffset()));

    // subtract exactly one day (for some reason Highcharts adds one to the day)
    processedDate = moment(processedDate).subtract(1, 'days').toDate();

    // return in UTC format
    return moment(processedDate).utc();
  }

  render() {    
    return (
      <div className="ExerciseGraph">
        <Highcharts config={this.state.graphConfig} />
      </div>
    );
  }
}

export default ExerciseGraph;
