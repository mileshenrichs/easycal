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
              id: '01009',
              name: 'Cheese, cheddar',
              selectedServing: {
                servingSize: {
                  id: 6,
                  label: 'slice (1 oz)',
                  ratio: 0.28
                },
                quantity: 5
              },
              servingSizes: [
                {
                  id: 1,
                  label: 'cup, diced',
                  ratio: 1.32
                },
                {
                  id: 2,
                  label: 'cup, melted',
                  ratio: 2.44
                },
                {
                  id: 3,
                  label: 'cup, shredded',
                  ratio: 1.13
                },
                {
                  id: 4,
                  label: 'oz',
                  ratio: 0.28
                },
                {
                  id: 5,
                  label: 'cubic inch',
                  ratio: 0.17
                },
                {
                  id: 6,
                  label: 'slice (1 oz)',
                  ratio: 0.28
                },
              ],
              calories: 403.00,
              carbs: 3.37,
              fat: 33.31,
              protein: 22.87,
              fiber: 0.00,
              sugar: 0.48,
              sodium: 653.00
            },
            {
              id: '45094321',
              name: 'Grilled Chicken Strips',
              selectedServing: {
                servingSize: {
                  id: 7,
                  label: 'strips | about',
                  ratio: 0.14
                },
                quantity: 8
              },
              servingSizes: [
                {
                  id: 7,
                  label: 'strips | about',
                  ratio: 0.14
                }
              ],
              calories: 141.00,
              carbs: 5.88,
              fat: 3.53,
              protein: 23.53,
              fiber: 2.40,
              sugar: 0.00,
              sodium: 412.00
            }
          ]
        },
        lunch: {
          items: []
        },
        dinner: {
          items: [
            {
              id: '45094321',
              name: 'Grilled Chicken Strips',
              selectedServing: {
                servingSize: {
                  id: 7,
                  label: 'strips | about',
                  ratio: 0.14
                },
                quantity: 3
              },
              servingSizes: [
                {
                  id: 7,
                  label: 'strips | about',
                  ratio: 0.14
                }
              ],
              calories: 141.00,
              carbs: 5.88,
              fat: 3.53,
              protein: 23.53,
              fiber: 2.40,
              sugar: 0.00,
              sodium: 412.00
            }
          ]
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
   * Calculates totals for each meal being displayed
  */
  calculateMealTotals() {
    let newMealTotals = [];
    for(var mealName in this.state.meals) {
      let totalCals, totalCarbs, totalFat, totalProtein;
      totalCals = totalCarbs = totalFat = totalProtein = 0;
      let meal = this.state.meals[mealName];
      meal.items.forEach(item => {
        let servingSizeMultiplier = item.selectedServing.quantity * item.selectedServing.servingSize.ratio;

        totalCals += Math.round(item.calories * servingSizeMultiplier);
        totalCarbs += Math.round(item.carbs * servingSizeMultiplier);
        totalFat += Math.round(item.fat * servingSizeMultiplier);
        totalProtein += Math.round(item.protein * servingSizeMultiplier);
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

  calculateDayTotals(mealTotals) {
    // calculate consumption totals (nutrients & calories)
    let caloriesEaten, carbs, fat, protein;
    caloriesEaten = carbs = fat = protein = 0;
    mealTotals.forEach(mealTotal => {
      caloriesEaten += mealTotal.calories;
      carbs += mealTotal.carbs;
      fat += mealTotal.fat;
      protein += mealTotal.protein;
    });

    // calculate net calories (consumption - activity)
    let netCalories = caloriesEaten - (this.state.caloriesBurned ? this.state.caloriesBurned : 0);
    return {
      caloriesEaten: caloriesEaten,
      netCalories: netCalories,
      carbs: carbs,
      fat: fat,
      protein: protein
    }
  }

  /**
   * Merge changed MealGroup states with DayView state
   * (sync with new serving size/quantity)
  */
  handleServingUpdate(newItemsList, mealType) {
    let newState = update(this.state, {
      meals: {
        [mealType]: {$set: newItemsList}
      }
    });
    this.setState(newState);
  }

  handleActivityChanged(calories) {
    let caloriesInt = Number(calories);
    this.setState({caloriesBurned: caloriesInt});
  }

  render() {
    let mealTotals = this.calculateMealTotals();
    let dayTotals = this.calculateDayTotals(mealTotals);

    return (
      <div className="DayView content-container">
        <DaySelect />
        <Calotron 
          netCalories={dayTotals.netCalories}
          caloriesEaten={dayTotals.caloriesEaten}
          caloriesBurned={this.state.caloriesBurned}
        />
        <div className="clearfix"></div>

        <MealGroup 
          type="Breakfast"
          items={this.state.meals.breakfast.items}
          handleServingUpdate={this.handleServingUpdate.bind(this)}
        />
        <MealGroup 
          type="Lunch"
          items={this.state.meals.lunch.items}
          handleServingUpdate={this.handleServingUpdate.bind(this)}
        />
        <MealGroup 
          type="Dinner"
          items={this.state.meals.dinner.items}
          handleServingUpdate={this.handleServingUpdate.bind(this)}
        />
        <MealGroup 
          type="Snacks"
          items={this.state.meals.snacks.items}
          handleServingUpdate={this.handleServingUpdate.bind(this)}
        />

        <ActivityInput
          caloriesBurned={this.state.caloriesBurned} 
          handleActivityChanged={this.handleActivityChanged.bind(this)}
        />
        <NetCalories
          caloriesEaten={dayTotals.caloriesEaten}
          caloriesBurned={this.state.caloriesBurned}
          netCalories={dayTotals.netCalories} 
        />
        <MacroTotals 
          totalCarbs={dayTotals.carbs}
          totalFat={dayTotals.fat}
          totalProtein={dayTotals.protein}
        />
      </div>
    );
  }
}

export default DayView;
