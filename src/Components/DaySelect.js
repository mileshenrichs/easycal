import React, { Component } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

class DaySelect extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pickerVisible: false
    }
  }

  componentDidUpdate() {
    if(this.state.pickerVisible) {
      document.body.addEventListener('click', this.handleClick.bind(this), true);
    }
  }

  handleDayChange(day) {
    this.setState({pickerVisible: false});
  }

  /**
   * Hide DayPicker popup if clicked outside
   */
  handleClick(e) {
    if(document.querySelector('.DayPicker')) {
      if(!document.querySelector('.DayPicker').contains(e.target)) {
        document.body.removeEventListener('click', this.handleClick.bind(this), true);
        this.setState({pickerVisible: false});
      }  
    }
  }

  render() {
    return (
      <div className="DaySelect">
  		  <div className="DaySelect__arrow left"></div>
        <span className="DaySelect__choose" onClick={() => this.setState({pickerVisible: true})}>
          <div className="DaySelect__calendar"></div>
          <span className="DaySelect__daytext">Today</span>
        </span>
        <div className="DaySelect__arrow right"></div>

        {this.state.pickerVisible && <DayPicker onDayClick={this.handleDayChange.bind(this)} />}
        <div class="clearfix"></div>
      </div>
    );
  }
}

export default DaySelect;
