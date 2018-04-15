import React, { Component } from 'react';

class SearchFood extends Component {
  render() {
    return (
      <div className="SearchFood">
        <h1 className="page-title">Add to Breakfast:</h1>
        <input type="text" placeholder="Search" />
      </div>
    );
  }
}

export default SearchFood;
