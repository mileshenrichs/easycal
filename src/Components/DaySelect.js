import React, { Component } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import leftArrow from '../resources/left-arrow-icon.png';
import rightArrow from '../resources/right-arrow-icon.png';
import calendarIcon from '../resources/calendar-icon.png';

class DaySelect extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pickerVisible: false
    }
  }

  handleDayChange(day) {
    this.setState({pickerVisible: false});
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
