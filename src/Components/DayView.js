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
          ],
          totals: {
            carbs: 24,
            fat: 42,
            protein: 32,
            calories: 350
          }
        },
        lunch: {
          items: [],
          totals: {}
        },
        dinner: {
          items: [],
          totals: {}
        },
        snacks: {
          items: [],
          totals: {}
        }
      },
      caloriesEaten: 2400,
      caloriesBurned: undefined,
      netCalories: undefined
    }
  }

  componentDidMount() {
    this.recalculateTotals(); // will not be needed once initial DB call is in place (totals pre-computed)
  }

  /**
   * Recalculates totals for each meal being displayed.
   * Sets state of meal totals and caloriesEaten.
  */
  recalculateTotals() {
    let newMealTotals = [];
    let newCaloriesEaten = 0;
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
      newCaloriesEaten += totalCals;
    }

    let newState = update(this.state, {
      meals: {
        breakfast: {
          totals: {$set: newMealTotals[0]}
        },
        lunch: {
          totals: {$set: newMealTotals[1]}
        },
        dinner: {
          totals: {$set: newMealTotals[2]}
        },
        snacks: {
          totals: {$set: newMealTotals[3]}
        }
      },
      caloriesEaten: {$set: newCaloriesEaten}
    });
    this.setState(newState);
  }

  handleActivityChanged(calories) {
    let caloriesInt = Number(calories);
    this.setState({caloriesBurned: caloriesInt});
  }

  render() {
    return (
      <div className="DayView">
        <DaySelect />
        <Calotron />
        <div className="clearfix"></div>

        <MealGroup 
          type="Breakfast"
          items={this.state.meals.breakfast.items}
          totals={this.state.meals.breakfast.totals}
        />
        <MealGroup 
          type="Lunch"
          items={this.state.meals.lunch.items}
          totals={this.state.meals.lunch.totals}
        />
        <MealGroup 
          type="Dinner"
          items={this.state.meals.dinner.items}
          totals={this.state.meals.dinner.totals}
        />
        <MealGroup 
          type="Snacks"
          items={this.state.meals.snacks.items}
          totals={this.state.meals.snacks.totals}
        />

        <ActivityInput
          caloriesBurned={this.state.caloriesBurned} 
          handleActivityChanged={this.handleActivityChanged.bind(this)}
        />
        <NetCalories
          caloriesEaten={this.state.caloriesEaten}
          caloriesBurned={this.state.caloriesBurned} 
        />
        <MacroTotals />
      </div>
    );
  }
}

export default DayView;
