import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchResults from './SearchResults';
import MyFoods from './MyFoods';
import RecentFoods from './RecentFoods';
import carbsIcon from '../resources/bread-emoji.png';
import fatIcon from '../resources/bacon-strip-emoji.png';
import proteinIcon from '../resources/steak-emoji.png';
import loader from '../resources/loader.gif';

class FoodsPanel extends Component {

	/**
	 * Switches which tab is displayed based on click
	 */
	handleSwitchTab(e) {
		let tab = e.target.attributes.class.value;
		if(!tab.includes(' ')) { // make sure we're actually switching to a different tab
			tab = tab.substring(tab.indexOf('--') + 2);
			let tabNumber = ['searchresults', 'recent', 'myfoods'].indexOf(tab);
			this.props.handleSwitchTab(tabNumber);
		}
	}

  shouldDisplayPanelHeader() {
    if(this.props.currentTab === 0 && this.props.searchError) {
      return false;
    }
    return true;
  }

  render() {
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
      		<Link to="/createfood">
          	<span className={'FoodsPanel__tab--createfoodbutton small-button' + (this.props.currentTab === 2 ? ' current' : '')}>+ New</span>
        	</Link>
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
  			{this.props.currentTab === 2 && <MyFoods />}
      </div>
    );
  }
}

export default FoodsPanel;
