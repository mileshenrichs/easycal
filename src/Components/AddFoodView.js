import React, { Component } from 'react';
import SearchFood from './SearchFood';
import FoodsPanel from './FoodsPanel';

class AddFoodView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			searchTerm: '',
			searchResults: [],
			searchError: false,
			foodsPanelTab: this.props.tab ? this.props.tab : 1,
			recentFoods: [],
			myFoods: [],
			loading: true
		}
	}

	componentDidMount() {
		// get recent consumptions
		fetch('/api/consumptions?type=recent&userId=1')
			.then((resp) => resp.json())
			.then(recentFoods => {
				this.setState({
					recentFoods: recentFoods,
					loading: false
				});
			});
	}

	switchTabs(tabNumber) {
		this.setState({foodsPanelTab: tabNumber});
	}

	handleSearchChange(term) {
		this.setState({
			searchTerm: term,
			foodsPanelTab: 0
		});

		// use timeout to prevent excessive/premature API calls
		if(this.apiCallTimeout) {
			clearTimeout(this.apiCallTimeout);
		}
		// force API call when term length is 4 (for responsiveness to new/adjusted searches)
		if(term.length !== 4) {
			this.apiCallTimeout = setTimeout(() => this.getSearchResults(term), 300);
		} else {
			this.getSearchResults(term);
		}
	}

	getSearchResults(searchTerm) {
		let term = searchTerm.replace(/\s/g, "_");
			fetch('/api/foods?q=' + term)
			.then((resp) => {
				if(resp.ok) {
					resp.json()
						.then(results => {
							this.setState({
								searchResults: results,
								searchError: false
							});
						});
				} else {
					this.setState({searchError: true});
				}
			});
	}

  render() {
    return (
      <div className="AddFoodView content-container">
        <SearchFood 
        	mealName={this.props.mealName}
        	searchTerm={this.state.searchTerm}
        	handleSearchChange={this.handleSearchChange.bind(this)}
      	 />
        <FoodsPanel 
        	mealName={this.props.mealName}
        	currentTab={this.state.foodsPanelTab}
      		handleSwitchTab={this.switchTabs.bind(this)} 
      		searchResults={this.state.searchResults}
      		searchError={this.state.searchError}
      		recentFoods={this.state.recentFoods}
      		loading={this.state.loading}
      		day={this.props.day}
    		/>
      </div>
    );
  }
}

export default AddFoodView;
