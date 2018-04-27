import React, { Component } from 'react';
import update from 'immutability-helper';
import DaySelect from './DaySelect';
import Calotron from './Calotron';
import MealGroup from './MealGroup';
import ActivityInput from './ActivityInput';
import NetCalories from './NetCalories';
import MacroTotals from './MacroTotals';

class DayView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      meals: {
        breakfast: {
          items: [
            {
              id: 1,
              name: 'Eggs, Scrambled',
              servingSize: {
                quantity: 3,
                unit: 'whole egg'
              },
              calories: 220,
              carbs: 15,
              fat: 20,
              protein: 18,
              fiber: 0,
              sugar: 0,
              sodium: 0
            },
            {
              id: 2,
              name: 'Sausage Links',
              servingSize: {
                quantity: 4,
                unit: 'link'
              },
              calories: 130,
              carbs: 9,
              fat: 22,
              protein: 14,
              fiber: 0,
              sugar: 0,
              sodium: 0
            }
          ]
        },
        lunch: {
          items: []
        },
        dinner: {
          items: []
        },
        snacks: {
          items: []
        }
      },
      caloriesBurned: undefined
    }
  }

  componentDidMount() {
    document.title = 'EasyCal';
  }

  /**
   * Calculates totals for each meal being displayed.
  */
  calculateMealTotals() {
    let newMealTotals = [];
    for(var mealName in this.state.meals) {
      let totalCals, totalCarbs, totalFat, totalProtein;
      totalCals = totalCarbs = totalFat = totalProtein = 0;
      let meal = this.state.meals[mealName];
      meal.items.forEach(item => {
        totalCals += item.calories;
        totalCarbs += item.carbs;
        totalFat += item.fat;
        totalProtein += item.protein;
      });
      newMealTotals.push({
        calories: totalCals,
        carbs: totalCarbs,
        fat: totalFat,
        protein: totalProtein
      });
    }
    return newMealTotals;
  }

  calculateDayTotals() {
    let dayTotals = {
      caloriesEaten: 2400,
      netCalories: 2250,
      carbs: 27,
      fat: 56,
      protein: 38
    }
    return dayTotals;
  }

  handleActivityChanged(calories) {
    let caloriesInt = Number(calories);
    this.setState({caloriesBurned: caloriesInt});
  }

  render() {
    let mealTotals = this.calculateMealTotals();
    let dayTotals = this.calculateDayTotals();

    return (
      <div className="DayView content-container">
        <DaySelect />
        <Calotron />
        <div className="clearfix"></div>

        <MealGroup 
          type="Breakfast"
          items={this.state.meals.breakfast.items}
          totals={mealTotals[0]}
        />
        <MealGroup 
          type="Lunch"
          items={this.state.meals.lunch.items}
          totals={mealTotals[1]}
        />
        <MealGroup 
          type="Dinner"
          items={this.state.meals.dinner.items}
          totals={mealTotals[2]}
        />
        <MealGroup 
          type="Snacks"
          items={this.state.meals.snacks.items}
          totals={mealTotals[3]}
        />

        <ActivityInput
          caloriesBurned={this.state.caloriesBurned} 
          handleActivityChanged={this.handleActivityChanged.bind(this)}
        />
        <NetCalories
          caloriesEaten={dayTotals.caloriesEaten}
          caloriesBurned={this.state.caloriesBurned} 
        />
        <MacroTotals />
      </div>
    );
  }
}

export default DayView;
