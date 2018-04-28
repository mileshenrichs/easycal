import React, { Component } from 'react';

class ServingSelect extends Component {

  constructor(props) {
    super(props);
    this.state = {
      quantityValue: this.props.selectedServing.quantity
    }
  }

  handleQuantityChange(e) {
    this.setState({
      quantityValue: e.target.value
    });
  }

  handleSizeChange(e) {
    this.props.handleSizeChange(e.target.value);
  }

  render() {

    let servingUnitOptions;
    if(this.props.servingSizes) {
      servingUnitOptions = this.props.servingSizes.map(servingSize => {
        if(servingSize.id === this.props.selectedServing.servingSize.id) { // set selected option to be current choice
          return (<option value={servingSize.id} selected>{servingSize.label}</option>);
        }
        return (<option value={servingSize.id}>{servingSize.label}</option>);
      });
    }

    return (
      <div className="ServingSelect animated fadeInDown" id="ServingSelect">
        <input type="text" name="servingAmt" id="servingAmt" placeholder="1" value={this.state.quantityValue} onChange={this.handleQuantityChange.bind(this)} />
        <select name="servingUnit" id="servingUnit" onChange={this.handleSizeChange.bind(this)}>
          {servingUnitOptions}
        </select> 
        <button className="ServingSelect__add-button">Add</button>
      </div>
    );
  }
}

export default ServingSelect;
