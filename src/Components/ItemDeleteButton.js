import React, { Component } from 'react';

class ItemDeleteButton extends Component {

  deleteItem(e) {
    e.stopPropagation();
    this.props.deleteItem();
  }

  render() {
    return (
      <div className="ItemDeleteButton animated fadeInDown" id="ItemDeleteButton" onClick={this.deleteItem.bind(this)}>
        <span>Delete this item</span>
      </div>
    );
  }
}

export default ItemDeleteButton;
