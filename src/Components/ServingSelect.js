import React, { Component } from 'react';

class ServingSelect extends Component {
  render() {

    let servingUnitOptions;
    if(this.props.servingSizes) {
      servingUnitOptions = this.props.servingSizes.map(servingSize => {
        if(servingSize.id === 3) { // set selected option to be current choice
          return (<option value={servingSize.id} selected>{servingSize.unit}</option>);
        }
        return (<option value={servingSize.id}>{servingSize.unit}</option>);
      });
    }

    return (
      <div className="ServingSelect animated fadeInDown" id="ServingSelect">
        <input type="text" name="servingAmt" id="servingAmt" placeholder="1" value="3" />
        <select name="servingUnit" id="servingUnit">
          {servingUnitOptions}
        </select> 
        <button className="ServingSelect__add-button">Add</button>
      </div>
    );
  }
}

export default ServingSelect;
