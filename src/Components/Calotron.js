import React, { Component } from 'react';
import loader from '../resources/loader.gif';

class Calotron extends Component {
  render() {
    let netCalories;
    if(this.props.loading) {
      netCalories = (
        <img src={loader} alt="loading" />
      );
    } else {
      netCalories = (
        <span className="Calotron__net">{this.props.netCalories}</span>
      )
    }

    return (
      <div className="Calotron">
  		  {netCalories}
        {!this.props.loading && this.props.caloriesEaten !== 0 && this.props.caloriesBurned != 0 &&

          <span className="Calotron__plusminuscontainer">
          <span className="Calotron__plusminus">
            <span className="Calotron__plusminus--food">+{this.props.caloriesEaten}</span>
            <span className="Calotron__plusminus--exercise">-{(this.props.caloriesBurned ? this.props.caloriesBurned : 0)}</span>
          </span>
        </span>}
      </div>
    );
  }
}

export default Calotron;
