import React, { Component } from 'react';
import AddableFoodItem from './AddableFoodItem';

class SearchResults extends Component {
  render() {
    return (
      <div className="SearchResults">
        <AddableFoodItem /> {/* map over props to get a list of these */}
        <AddableFoodItem />
      </div>
    );
  }
}

export default SearchResults;
