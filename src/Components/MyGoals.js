import React, { Component } from 'react';
import decodeToken from '../Auth/authUtil';
import baseUrl from '../Deployment/deploymentConfig';

class MyGoals extends Component {

  constructor(props) {
    super(props);
    this.state = {
      goals: {
        calories: '',
        carbs: '',
        fat: '',
        protein: '',
        fiber: '',
        sugar: '',
        sodium: ''
      },
      saving: false,
      finishedSaving: false
    }
  }

  componentDidMount() {
    const userId = decodeToken(localStorage.getItem('token')).userId;

    fetch('/api/goals/' + userId + '?token=' + localStorage.getItem('token'))
      .then(res => {
        if(res.ok) {
          return res.json()
          .then(goals => {
            for(var goalCategory in goals) {
              if(goals[goalCategory] === -1) {
                goals[goalCategory] = '';
              }
            }
            this.setState({goals: goals});
          });
        } else if(res.status === 403) {
          localStorage.removeItem('token');
          window.location = baseUrl() + '/login';
        }
      });
  }

  handleSubmit(e) {
    const userId = decodeToken(localStorage.getItem('token')).userId;

    e.preventDefault();
    this.setState({saving: true})
    let goalsObj = {
      userId: userId
    };

    if(e.target[0].value) {
      goalsObj.calories = parseInt(e.target[0].value, 10);
    }
    if(e.target[1].value) {
      goalsObj.carbs = parseInt(e.target[1].value, 10);
    }
    if(e.target[2].value) {
      goalsObj.fat = parseInt(e.target[2].value, 10);
    }
    if(e.target[3].value) {
      goalsObj.protein = parseInt(e.target[3].value, 10);
    }
    if(e.target[4].value) {
      goalsObj.fiber = parseInt(e.target[4].value, 10);
    }
    if(e.target[5].value) {
      goalsObj.sugar = parseInt(e.target[5].value, 10);
    }
    if(e.target[6].value) {
      goalsObj.sodium = parseInt(e.target[6].value, 10);
    }

    const reqObj = {
      goals: goalsObj,
      token: localStorage.getItem('token')
    }

    fetch('/api/goals', {
      method: 'POST',
      body: JSON.stringify(reqObj)
    })
      .then(res => {
        if(res.ok) {
          this.setState({
            saving: false,
            finishedSaving: true
          })
        } else {
          alert('Goals could not be saved.');
          this.setState({
            saving: false
          });
        }
      });
  }

  handleInputChange(e) {
    if(this.state.finishedSaving) {
      this.setState({finishedSaving: false})
    }

    let fieldChanged = e.target.name;
    this.setState({
      goals: {
        [fieldChanged]: e.target.value
      }
    });
  }

  render() {
    let saveButton;
    if(!this.state.saving) {
      saveButton = (
        <button type="submit" className="CreateFoodView__submit-button">Save Goals</button>
        );
    } else {
      saveButton = (
        <button type="submit" className="CreateFoodView__submit-button saving">Saving...</button>
      );
    }

    return (
      <div className="MyGoals">
        <form className="MyGoals__form" onSubmit={this.handleSubmit.bind(this)}>
          <span className="MyGoals__form--input">
            <label htmlFor="calories">Calories</label>
            <input type="text" name="calories" placeholder="2300" value={this.state.goals.calories} onChange={this.handleInputChange.bind(this)} />
          </span>
          <span className="MyGoals__form--input">
            <label htmlFor="carbs">Carbohydrates (g)</label>
            <input type="text" name="carbs" placeholder="250 g" value={this.state.goals.carbs} onChange={this.handleInputChange.bind(this)} />
          </span>
          <span className="MyGoals__form--input">
            <label htmlFor="fat">Fat (g)</label>
            <input type="text" name="fat" placeholder="80 g" value={this.state.goals.fat} onChange={this.handleInputChange.bind(this)} />
          </span>
          <span className="MyGoals__form--input">
            <label htmlFor="protein">Protein (g)</label>
            <input type="text" name="protein" placeholder="110 g" value={this.state.goals.protein} onChange={this.handleInputChange.bind(this)} />
          </span>
          <span className="MyGoals__form--input">
            <label htmlFor="fiber">Fiber (g)</label>
            <input type="text" name="fiber" placeholder="20 g" value={this.state.goals.fiber} onChange={this.handleInputChange.bind(this)} />
          </span>
          <span className="MyGoals__form--input">
            <label htmlFor="sugar">Sugar (g)</label>
            <input type="text" name="sugar" placeholder="75 g" value={this.state.goals.sugar} onChange={this.handleInputChange.bind(this)} />
          </span>
          <span className="MyGoals__form--input">
            <label htmlFor="sodium">Sodium (mg)</label>
            <input type="text" name="sodium" placeholder="1600 mg" value={this.state.goals.sodium} onChange={this.handleInputChange.bind(this)} />
          </span>
          <div className="clearfix"></div>
          {saveButton}
          {this.state.finishedSaving && 
            <span className="MyGoals__form--save-success animated fadeIn" id="save-success-message">Your goals have been updated.</span>
          }
        </form>
      </div>
    );
  }
}

export default MyGoals;
