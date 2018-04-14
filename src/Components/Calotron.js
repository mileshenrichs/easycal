import React, { Component } from 'react';

class Calotron extends Component {
  render() {
    return (
      <div className="Calotron">
  		  <span className="Calotron__net">2,150</span>
        <span className="Calotron__plusminuscontainer">
          <span className="Calotron__plusminus">
            <span className="Calotron__plusminus--food">+2400</span>
            <span className="Calotron__plusminus--exercise">-150</span>
          </span>
        </span>
      </div>
    );
  }
}

export default Calotron;
