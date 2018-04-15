import React, { Component } from 'react';
import AddableFoodItem from './AddableFoodItem';

class MyFoods extends Component {
  render() {
    return (
      <div className="MyFoods">
        <AddableFoodItem />
        <AddableFoodItem />
        <AddableFoodItem />
        <AddableFoodItem />
        <AddableFoodItem />
        <AddableFoodItem />
        <AddableFoodItem />
        <AddableFoodItem />
      </div>
    );
  }
}

export default MyFoods;
