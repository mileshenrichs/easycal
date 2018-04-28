import React, { Component } from 'react';

class Calotron extends Component {
  render() {
    return (
      <div className="Calotron">
  		  <span className="Calotron__net">{this.props.netCalories}</span>
        <span className="Calotron__plusminuscontainer">
          <span className="Calotron__plusminus">
            <span className="Calotron__plusminus--food">+{this.props.caloriesEaten}</span>
            <span className="Calotron__plusminus--exercise">-{(this.props.caloriesBurned ? this.props.caloriesBurned : 0)}</span>
          </span>
        </span>
      </div>
    );
  }
}

export default Calotron;
