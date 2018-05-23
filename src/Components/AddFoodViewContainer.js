import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import baseUrl from '../Deployment/deploymentConfig';
import qs from 'qs';
import AddFoodView from './AddFoodView';

class AddFoodViewContainer extends Component {

	componentDidMount() {
		document.title = 'EasyCal: Add a Food';
		window.scrollTo(0, 0);
	}

  render() {
    const qsParsed = qs.parse(this.props.location.search.slice(1));
    let mealName = qsParsed.m;
    let day = qsParsed.day;
    let tab = parseInt(qsParsed.t, 10);
    return (
      <div className="AddFoodViewContainer">
        <AddFoodView mealName={mealName} day={day} tab={tab} />
        <div className="FoodsPanel__cancel-link">
          <div className="container">
            <Link to={baseUrl() + "/"}>Cancel</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default AddFoodViewContainer;
