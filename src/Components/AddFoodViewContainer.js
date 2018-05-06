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
    return (
      <div className="AddFoodViewContainer">
        <AddFoodView mealName={mealName} />
        <div className="FoodsPanel__cancel-link"><Link to="/">Cancel</Link></div>
      </div>
    );
  }
}

export default AddFoodViewContainer;
