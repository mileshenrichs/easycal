import React, { Component } from 'react';
import Highcharts from 'react-highcharts';

class ExerciseGraph extends Component {

  constructor(props) {
    super(props);
    this.state = {
      graphConfig: {
        title: {
            text: 'Exercise and Food Consumption'
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
              pointStart: 2010
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

  render() {
    return (
      <div className="ExerciseGraph">
        <Highcharts config={this.state.graphConfig} />
      </div>
    );
  }
}

export default ExerciseGraph;
