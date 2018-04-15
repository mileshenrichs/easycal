import React, { Component } from 'react';
import SearchFood from './SearchFood';
import FoodsPanel from './FoodsPanel';

class AddFoodView extends Component {

	componentDidMount() {
		document.title = 'EasyCal: Add a Food';
		window.scrollTo(0, 0);
	}

  render() {
    return (
      <div className="AddFoodView content-container">
        <SearchFood />
        <FoodsPanel />
      </div>
    );
  }
}

export default AddFoodView;
