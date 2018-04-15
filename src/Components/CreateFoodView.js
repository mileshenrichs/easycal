import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import carbsIcon from '../resources/bread-emoji.png';
import fatIcon from '../resources/bacon-strip-emoji.png';
import proteinIcon from '../resources/steak-emoji.png';
import fiberIcon from '../resources/broccoli-emoji.png';
import sugarIcon from '../resources/lollipop-emoji.png';
import sodiumIcon from '../resources/fries-emoji.png';

class CreateFoodView extends Component {

	componentDidMount() {
		document.title = 'EasyCal: Create Food';
	}

  handleSubmit(e) {
    e.preventDefault();
    let name = e.target[0].value;
    let servingsize = e.target[1].value;
    let carbs = e.target[2].value;
    let fat = e.target[3].value;
    let protein = e.target[4].value;
    let fiber = e.target[5].value;
    let sugar = e.target[6].value;
    let sodium = e.target[7].value;
  }

  render() {
    return (
      <div className="CreateFoodView content-container">
        <h1 className="page-title">Create Food</h1>
        <form className="CreateFoodView__form" onSubmit={this.handleSubmit.bind(this)}>
          <label htmlFor="name">Food Name</label>
          <input type="text" name="name" id="name" placeholder="Caesar Salad" />
          <label htmlFor="servingsize">Serving Size</label>
          <input type="text" name="servingsize" id="servingsize" placeholder="1 bowl" />

          <span className="CreateFoodView__nutrition-separator">NUTRITION</span>

          <div className="CreateFoodView__inputgroup">
            <div className="CreateFoodView__input">
              <span className="CreateFoodView__input--image">
                <img src={carbsIcon} alt="Carbs" />
              </span>
              <label htmlFor="carbs"><strong>Carbohydrates</strong></label>
              <input type="text" name="carbs" id="carbs" placeholder="80 g" />
            </div>
            <div className="CreateFoodView__input">
              <span className="CreateFoodView__input--image">
                <img src={fatIcon} alt="Fat" />
              </span>
              <label htmlFor="fat"><strong>Fat</strong></label>
              <input type="text" name="fat" id="fat" placeholder="16 g" />
            </div>
            <div className="CreateFoodView__input">
              <span className="CreateFoodView__input--image">
                <img src={proteinIcon} alt="Protein" />
              </span>
              <label htmlFor="protein"><strong>Protein</strong></label>
              <input type="text" name="protein" id="protein" placeholder="33 g" />
            </div>
          </div>

          <div className="CreateFoodView__inputgroup">
            <div className="CreateFoodView__input">
              <span className="CreateFoodView__input--image">
                <img src={fiberIcon} alt="Fiber" />
              </span>
              <label htmlFor="fiber">Fiber</label>
              <input type="text" name="fiber" id="fiber" placeholder="80 g" />
            </div>
            <div className="CreateFoodView__input">
              <span className="CreateFoodView__input--image">
                <img src={sugarIcon} alt="Sugar" />
              </span>
              <label htmlFor="sugar">Sugar</label>
              <input type="text" name="sugar" id="sugar" placeholder="16 g" />
            </div>
            <div className="CreateFoodView__input">
              <span className="CreateFoodView__input--image">
                <img src={sodiumIcon} alt="Sodium" />
              </span>
              <label htmlFor="sodium">Sodium</label>
              <input type="text" name="sodium" id="sodium" placeholder="33 g" />
            </div>
          </div>

          <button className="CreateFoodView__submit-button" type="submit">Create and Add</button>
          <Link to="/add" className="cancel-link" >Cancel</Link>
        </form>
        <div className="clearfix"></div>
      </div>
    );
  }
}

export default CreateFoodView;
