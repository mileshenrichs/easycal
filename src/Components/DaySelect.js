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
    this.props.changeSelectedDay(day);
  }

  changeToDayBefore() {
    let newDay = this.props.selectedDay;
    newDay.setDate(newDay.getDate() - 1);
    this.handleDayChange(newDay);
  }

  changeToDayAfter() {
    let newDay = this.props.selectedDay;
    newDay.setDate(newDay.getDate() + 1);
    this.handleDayChange(newDay);
  }

  formatDayText() {
    if(this.selectedDayIsToday()) {
      return 'Today';
    }
    let date = this.props.selectedDay;
    const delimiter = '/';
    return [date.getMonth() + 1, date.getDate(), date.getFullYear()].join(delimiter);
  }

  selectedDayIsToday() {
    let date = this.props.selectedDay;
    let today = new Date(Date.now() - (60000 * new Date().getTimezoneOffset()));
    return date.toISOString().split('T')[0] === today.toISOString().split('T')[0];
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

  goToToday() {
    // update hash w/ query param of today's date, then refresh page so query string is re-read
    window.location.hash = '#/?day=' + new Date(Date.now() - (60000 * new Date().getTimezoneOffset())).toISOString().split('T')[0];
    window.location.reload(false);
  }

  render() {
    let dayText = this.formatDayText();
    return (
      <div className="DaySelect">
        {!this.selectedDayIsToday() && 
            <span onClick={this.goToToday} className="DaySelect--today-button small-button">Today</span>}
  		  <div className="DaySelect__arrow left" onClick={this.changeToDayBefore.bind(this)}></div>
        <span className="DaySelect__choose" onClick={() => this.setState({pickerVisible: true})}>
          <div className="DaySelect__calendar"></div>
          <span className="DaySelect__daytext">{dayText}</span>
        </span>
        {!this.selectedDayIsToday() && 
          <div className="DaySelect__arrow right" onClick={this.changeToDayAfter.bind(this)}></div>}

        {this.state.pickerVisible && 
          <DayPicker 
            onDayClick={this.handleDayChange.bind(this)} 
            selectedDays={this.props.selectedDay}
            month={new Date(this.props.selectedDay.getFullYear(), this.props.selectedDay.getMonth())}
          />}
        <div className="clearfix"></div>
      </div>
    );
  }
}

export default DaySelect;
