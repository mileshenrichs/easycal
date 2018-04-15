import React, { Component } from 'react';
import AddableFoodItem from './AddableFoodItem';

class RecentFoods extends Component {
  render() {
    return (
      <div className="RecentFoods">
        <AddableFoodItem /> {/* map over props to get a list of these */}
        <AddableFoodItem />
        <AddableFoodItem />
      </div>
    );
  }
}

export default RecentFoods;
