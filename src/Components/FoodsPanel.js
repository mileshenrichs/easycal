import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import deploymentConfig from '../Deployment/deploymentConfig';
import SearchResults from './SearchResults';
import MyFoods from './MyFoods';
import RecentFoods from './RecentFoods';
import carbsIcon from '../resources/bread-emoji.png';
import fatIcon from '../resources/bacon-strip-emoji.png';
import proteinIcon from '../resources/steak-emoji.png';
import loader from '../resources/loader.gif';
import MyMeals from './MyMeals';

class FoodsPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editMode: false
    };
  }

	/**
	 * Switches which tab is displayed based on click
	 */
	handleSwitchTab(e) {
		let tab = e.target.attributes.class.value;
		if(!tab.includes(' ')) { // make sure we're actually switching to a different tab
			tab = tab.substring(tab.indexOf('--') + 2);
			let tabNumber = ['searchresults', 'recent', 'myfoods', 'mymeals'].indexOf(tab);

      // make sure edit mode is off when switching to My Foods tab
      if(tabNumber === 2) {
        this.setState({editMode: false});
      }

			this.props.handleSwitchTab(tabNumber);
		}
	}

  shouldDisplayPanelHeader() {
    if((this.props.currentTab === 0 && this.props.searchError)
      || (this.props.currentTab === 2 && !this.props.myFoods.length)
      || this.props.currentTab === 3) {
      return false;
    }
    return true;
  }

  editMode() {
    this.setState(prevState => ({
      editMode: !prevState.editMode
    }));
  }

  getUserFoods() {
    this.props.getUserFoods();
  }

  deleteUserFoodItem(foodItemId) {
    this.props.deleteUserFoodItem(foodItemId);
  }

  render() {
    let editLink;
    if(!this.state.editMode) {
      editLink = (
          <span className={'FoodsPanel__edit-foods' + ([2, 3].includes(this.props.currentTab) ? ' current' : '')} onClick={this.editMode.bind(this)}>
            <i className="fas fa-pencil-alt"></i> &nbsp;edit
          </span>
        );
    } else {
      editLink = (
          <span className={'FoodsPanel__edit-foods edit-mode' + ([2, 3].includes(this.props.currentTab) ? ' current' : '')}>
            <i className="fas fa-pencil-alt"></i> &nbsp;<b>Edit Mode</b> <span className="FoodsPanel__edit-foods--done-link" onClick={this.editMode.bind(this)}>(done)</span>
          </span>
        );
    }

    return (
      <div className="FoodsPanel">
        <div className="FoodsPanel__tabs">
        	<span 
        		className={'FoodsPanel__tab--searchresults' + (this.props.currentTab === 0 ? ' current' : '')}
        		onClick={this.handleSwitchTab.bind(this)}>Search Results</span>
        	<span 
        		className={'FoodsPanel__tab--recent' + (this.props.currentTab === 1 ? ' current' : '')}
      			onClick={this.handleSwitchTab.bind(this)}>Recent</span>
        	<span 
        		className={'FoodsPanel__tab--myfoods' + (this.props.currentTab === 2 ? ' current' : '')}
        		onClick={this.handleSwitchTab.bind(this)}>My Foods</span>
          <span 
        		className={'FoodsPanel__tab--mymeals' + (this.props.currentTab === 3 ? ' current' : '')}
      			onClick={this.handleSwitchTab.bind(this)}>My Meals</span>
      		<Link to={deploymentConfig().baseUrl + '/createfood?from=' + this.props.day + '&for=' + this.props.mealName + ''}>
            <span className={'FoodsPanel__tab--createfoodbutton small-button' + (this.props.currentTab === 2 ? ' current' : '')}>+ New</span>
          </Link>
          {editLink}
          {this.props.loading && <img id="FoodsPanel__tabs--loader" src={loader} alt="loading" />}
        </div>

        {this.shouldDisplayPanelHeader() && 
          <div className="FoodsPanel__header">
            <span className="FoodsPanel__header--macros">
              <img src={carbsIcon} alt="Carbs" title="Carbs" />
              <img src={fatIcon} alt="Fat" title="Fat" />
              <img src={proteinIcon} alt="Protein" title="Protein" />
            </span>
          </div>
        }

  			{this.props.currentTab === 0 && 
          <SearchResults 
            results={this.props.searchResults} 
            error={this.props.searchError} 
            mealName={this.props.mealName}
            day={this.props.day}
          />}
  			{this.props.currentTab === 1 && 
          <RecentFoods 
            foods={this.props.recentFoods} 
            mealName={this.props.mealName}
            day={this.props.day}
          />}
  			{this.props.currentTab === 2 && 
          <MyFoods 
            mealName={this.props.mealName} 
            day={this.props.day}
            getFoods={this.getUserFoods.bind(this)}
            foods={this.props.myFoods}
            deleteUserFoodItem={this.deleteUserFoodItem.bind(this)}
            editMode={this.state.editMode}
          />}
        {this.props.currentTab === 3 &&
          <MyMeals 
            editMode={this.state.editMode}
          />}
      </div>
    );
  }
}

export default FoodsPanel;
