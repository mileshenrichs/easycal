import React, { Component } from 'react';
import SearchFood from './SearchFood';
import FoodsPanel from './FoodsPanel';

class AddFoodView extends Component {
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
