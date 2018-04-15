import React, { Component } from 'react';
import SearchResults from './SearchResults';
import MyFoods from './MyFoods';
import RecentFoods from './RecentFoods';
import carbsIcon from '../resources/bread-emoji.png';
import fatIcon from '../resources/bacon-strip-emoji.png';
import proteinIcon from '../resources/steak-emoji.png';

class FoodsPanel extends Component {

	constructor(props) {
		super(props);
		this.state = {
			currentTab: 1
		}
	}

	/**
	 * Event handler.  Switches which tab is displayed based on click
	 */
	switchTabs(e) {
		let tab = e.target.attributes.class.value;
		if(!tab.includes(' ')) { // make sure we're actually switching to a different tab
			tab = tab.substring(tab.indexOf('--') + 2);
			let tabNumber = ['searchresults', 'recent', 'myfoods'].indexOf(tab);
			this.setState({currentTab: tabNumber});
		}
	}

  render() {
    return (
      <div className="FoodsPanel">
        <div className="FoodsPanel__tabs">
        	<span 
        		className={'FoodsPanel__tab--searchresults' + (this.state.currentTab === 0 ? ' current' : '')}
        		onClick={this.switchTabs.bind(this)}>Search Results</span>
        	<span 
        		className={'FoodsPanel__tab--recent' + (this.state.currentTab === 1 ? ' current' : '')}
      			onClick={this.switchTabs.bind(this)}>Recent</span>
        	<span 
        		className={'FoodsPanel__tab--myfoods' + (this.state.currentTab === 2 ? ' current' : '')}
        		onClick={this.switchTabs.bind(this)}>My Foods</span>
        	<span className={'FoodsPanel__tab--createfoodbutton' + (this.state.currentTab === 2 ? ' current' : '')}>+ New</span>
        </div>

        <div className="FoodsPanel__header">
	  			<span className="FoodsPanel__header--macros">
	  				<img src={carbsIcon} alt="Carbs" title="Carbs" />
	  				<img src={fatIcon} alt="Fat" title="Fat" />
	  				<img src={proteinIcon} alt="Protein" title="Protein" />
	  			</span>
	  			<span className="MealGroup__header--caltotal">200</span>
  			</div>

  			{this.state.currentTab === 0 && <SearchResults />}
  			{this.state.currentTab === 1 && <RecentFoods />}
  			{this.state.currentTab === 2 && <MyFoods />}
      </div>
    );
  }
}

export default FoodsPanel;
