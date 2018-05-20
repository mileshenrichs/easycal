import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import AddFoodView from './AddFoodView';

class AddFoodViewContainer extends Component {

	componentDidMount() {
		document.title = 'EasyCal: Add a Food';
		window.scrollTo(0, 0);
	}

  render() {
    let mealName = queryString.parse(this.props.location.search).m;
    let day = queryString.parse(this.props.location.search).day;
    let tab = parseInt(queryString.parse(this.props.location.search).t, 10);
    return (
      <div className="AddFoodViewContainer">
        <AddFoodView mealName={mealName} day={day} tab={tab} />
        <div className="FoodsPanel__cancel-link">
          <div className="container">
            <Link to="/">Cancel</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default AddFoodViewContainer;
