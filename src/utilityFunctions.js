import React from 'react';

export default {
  // Returns the value of the element that is currently
  // being hovered
  getHoveredValue(hoverIndex) {
    return React.Children.toArray(this.props.children)[hoverIndex].props.value;
  },

  getSelectedIndex(value) {
    return React.Children.map(this.props.children, c => c.props.value).indexOf(value);
  }
};
