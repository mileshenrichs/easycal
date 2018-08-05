import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import deploymentConfig from '../Deployment/deploymentConfig';
import qs from 'qs';
import AddFoodView from './AddFoodView';
import checkmark from '../resources/checkmark-icon-white.png';

class AddFoodViewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: undefined,
      mealGroupContext: undefined
    };
  }

	componentDidMount() {
		document.title = 'EasyCal: Add a Food';
		window.scrollTo(0, 0);
  }
  
  fetchMealGroupToProvideAsContext(mealGroupId) {
    fetch(deploymentConfig().apiUrl + '/api/food-meal-groups/' + mealGroupId + '?token=' + localStorage.getItem('token'))
				.then((resp) => resp.json())
				.then(mealGroup => {
					this.setState({mealGroupContext: mealGroup});
        })
        .then(() => this.setState({tab: 1}));
  }

  handleDoneAddingFoodsClick() {
    const currentLocation = window.location.hash.substring(1);
    const nextLocation = currentLocation.substring(0, currentLocation.indexOf('&mealgroupctx=')) + '&tab=3';
    window.location.hash = nextLocation;
    window.location.reload(false);
  }

  render() {
    const qsParsed = qs.parse(this.props.location.search.slice(1));
    const mealName = qsParsed.m;
    const day = qsParsed.day;
    const tab = parseInt(qsParsed.t, 10);
    const mealGroupContext = qsParsed.mealgroupctx;

    if(tab && this.state.tab !== tab) {
      this.setState({tab});
    }

    if(mealGroupContext && !this.state.mealGroupContext) {
      this.fetchMealGroupToProvideAsContext(mealGroupContext);
    }

    let cancelLinkContents;
    if(!this.state.mealGroupContext) {
      cancelLinkContents = (
        <div className="container">
          <Link to={deploymentConfig().baseUrl + "/"}>Cancel</Link>
        </div>
      );
    } else {
      cancelLinkContents = (
        <div className="container">
          <span className="FoodsPanel__context">Adding foods to <b>{this.state.mealGroupContext.name}</b>...</span>
          <button className="FoodsPanel__done-button" onClick={this.handleDoneAddingFoodsClick.bind(this)}>
            <img src={checkmark} alt="" />
            I'm done adding foods
          </button>
        </div>
      );
    }

    return (
      <div className="AddFoodViewContainer">
        <AddFoodView 
          mealName={mealName} 
          day={day} 
          tab={this.state.tab} 
          mealGroupContext={this.state.mealGroupContext}
        />
        <div className="FoodsPanel__cancel-link">
          {cancelLinkContents}
        </div>
      </div>
    );
  }
}

export default AddFoodViewContainer;
