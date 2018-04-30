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
    this.props.handleQuantityChange(e.target.value);
  }

  handleSizeChange(e) {
    this.props.handleSizeChange(e.target.value);
  }

  handleItemRemove() {
    this.props.handleItemRemove();
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

    let removeButtonText = this.props.removingItem ? 'Removing...' : 'Remove'

    return (
      <div className="ServingSelect animated fadeInDown" id="ServingSelect">
        <input type="text" name="servingAmt" id="servingAmt" placeholder="1" value={this.state.quantityValue} onChange={this.handleQuantityChange.bind(this)} />
        <select name="servingUnit" id="servingUnit" onChange={this.handleSizeChange.bind(this)}>
          {servingUnitOptions}
        </select> 
        <button className="ServingSelect__add-button">Add</button>
        <button className={'ServingSelect__remove-button' + (this.props.removingItem ? ' removing' : '')} onClick={this.handleItemRemove.bind(this)}>{removeButtonText}</button>
      </div>
    );
  }
}

export default ServingSelect;
