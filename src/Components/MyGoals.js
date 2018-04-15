import React, { Component } from 'react';

class MyGoals extends Component {

  handleSubmit(e) {
    e.preventDefault();
    let calories = e.target[0].value;
    let carbs = e.target[1].value;
    let fat = e.target[2].value;
    let protein = e.target[3].value;
    let fiber = e.target[4].value;
    let sugar = e.target[5].value;
    let sodium = e.target[6].value;
    alert(calories);
  }

  render() {
    return (
      <div className="MyGoals">
        <form className="MyGoals__form" onSubmit={this.handleSubmit.bind(this)}>
          <span className="MyGoals__form--input">
            <label htmlFor="calories">Calories</label>
            <input type="text" name="calories" id="calories" placeholder="2300" />
          </span>
          <span className="MyGoals__form--input">
            <label htmlFor="carbs">Carbohydrates (g)</label>
            <input type="text" name="carbs" id="carbs" placeholder="250" />
          </span>
          <span className="MyGoals__form--input">
            <label htmlFor="fat">Fat (g)</label>
            <input type="text" name="fat" id="fat" placeholder="80" />
          </span>
          <span className="MyGoals__form--input">
            <label htmlFor="protein">Protein (g)</label>
            <input type="text" name="protein" id="protein" placeholder="110" />
          </span>
          <span className="MyGoals__form--input">
            <label htmlFor="fiber">Fiber (g)</label>
            <input type="text" name="fiber" id="fiber" placeholder="20" />
          </span>
          <span className="MyGoals__form--input">
            <label htmlFor="sugar">Sugar (g)</label>
            <input type="text" name="sugar" id="sugar" placeholder="75" />
          </span>
          <span className="MyGoals__form--input">
            <label htmlFor="sodium">Sodium (mg)</label>
            <input type="text" name="sodium" id="sodium" placeholder="1600" />
          </span>
          <div className="clearfix"></div>
          <button type="submit" className="CreateFoodView__submit-button">Save Goals</button>
        </form>
      </div>
    );
  }
}

export default MyGoals;
