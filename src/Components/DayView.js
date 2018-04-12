import React, { Component } from 'react';
import MealGroup from './MealGroup';

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
        }
      }
    }
  }

  render() {
    return (
      <div className="DayView">
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
      </div>
    );
  }
}

export default DayView;
