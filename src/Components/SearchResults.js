import React, { Component } from 'react';
import AddableFoodItem from './AddableFoodItem';

class SearchResults extends Component {
  render() {
  	let searchResults;
  	if(this.props.error) {
  		searchResults = (
  			<p className="SearchResults__error">
          <span role="img" aria-label="sad face">😞</span> 
          Sorry, I can't find anything that matches your query.  Maybe try something different?
        </p>
			);
  	} else {
  		if(this.props.results) {
  		searchResults = this.props.results.map(result => {
  			return (
  				<AddableFoodItem 
            key={result.foodItemId} 
            item={result} 
            mealName={this.props.mealName}
            day={this.props.day}
          />
				);	
  		});
  	}
  	}
    return (
      <div className="SearchResults">
        {searchResults}
      </div>
    );
  }
}

export default SearchResults;
