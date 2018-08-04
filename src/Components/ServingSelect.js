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
    this.props.handleSizeChange(parseInt(e.target.value, 10));
  }

  handleItemRemove() {
    this.props.handleItemRemove();
  }

  /**
  * Click handler to prevent propogation up to AddableFoodItem
  * (prevent the item from hiding <ServingSelect />)
  */
  handleInputClick(e) {
    e.stopPropagation();
  }

  handleAddClick(e) {
    e.stopPropagation();
    this.props.handleAddClick(this.props.itemId);
  }

  render() {
    let servingUnitOptions;
    if(this.props.servingSizes) {
      servingUnitOptions = this.props.servingSizes.map(servingSize => {
        return (<option key={servingSize.id} value={servingSize.id}>{servingSize.label.labelValue}</option>);
      });
    }

    let removeButtonText = this.props.removingItem ? 'Removing...' : 'Remove'

    return (
      <div className="ServingSelect animated fadeInDown" id="ServingSelect">
        <input className="servingAmt" type="text" name="servingAmt" id="servingAmt" placeholder="1" 
          value={this.state.quantityValue} onChange={this.handleQuantityChange.bind(this)} onClick={this.handleInputClick.bind(this)} />
        <select className="servingAmt" name="servingUnit" id="servingUnit" defaultValue={this.props.selectedServing.servingSize.id}
          onChange={this.handleSizeChange.bind(this)} onClick={this.handleInputClick.bind(this)}>
          {servingUnitOptions}
        </select> 
        {this.props.showAddRemoveButtons && 
          <button className="ServingSelect__add-button" onClick={this.handleAddClick.bind(this)}>Add</button>}
        {this.props.showAddRemoveButtons && 
          <button className={'ServingSelect__remove-button' + (this.props.removingItem ? ' removing' : '')} 
                  onClick={this.handleItemRemove.bind(this)}>{removeButtonText}</button>}
      </div>
    );
  }
}

export default ServingSelect;
