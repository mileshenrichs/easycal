import React, { Component } from 'react';

class SearchFood extends Component {

	handleSearchChange(e) {
		this.props.handleSearchChange(e.target.value);
	}

  render() {
    let mealName;
    if(this.props.mealGroupContext) {
      mealName = this.props.mealGroupContext.name;
    } else {
      mealName = this.props.mealName.substring(0, 1).toUpperCase() + this.props.mealName.substring(1);
    }
    return (
      <div className={'SearchFood' + (this.props.mealGroupContext ? ' with-meal-context' : '')}>
        <h1 className="page-title">Add to {mealName}:</h1>
        <input type="text" placeholder="Search" value={this.props.searchTerm} onChange={this.handleSearchChange.bind(this)} />
      </div>
    );
  }
}

export default SearchFood;
