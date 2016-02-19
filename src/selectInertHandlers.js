/* @flow */

import React from 'react';

type InertHandlers = {
  onExpanded: (a: any) => any,
  onClosed: (a: any) => any
};

export default {
  /*
   INERT HANDLERS
   These handlers respond to events on the inert select
   and help to make it behave like a real select, including
   opening it, closing it, hovering over elements, keyboard
   control selections, and so forth.
   */
  generateInertHandlers(): InertHandlers {
    return {
      onExpanded: this.handleInertSelectExpanded,
      onClosed: this.handleInertSelectClosed,

      onHoverIndex: this.handleInertHoverIndex,
      onActiveIndex: this.handleInertActiveIndex,
      onSelectIndex: this.handleInertSelectIndex
    };
  },

  handleInertSelectExpanded(e: React.SyntheticMouseEvent | React.SyntheticTouchEvent) {
    this.setState({
      isExpanded: true,
      isFocused: true
    });
    this._backingSelect.focus();
  },

  handleInertSelectClosed(e: React.SyntheticMouseEvent | React.SyntheticTouchEvent) {
    this.setState({
      isExpanded: false,
      isFocused: true
    });
  },

  handleInertHoverIndex(i: number, v: string, e) {
    console.log('inert hover with index', i)
    this.props.onOptionHover(e, v);
    this.setState({
      hoverIndex: i
    });
  },

  handleInertActiveIndex(i: number, v: string, e) {
    this.setState({
      activeIndex: i
    });
    this.props.onOptionActive(e, v);
    console.log('inert active with index and value', i , v);
  },

  handleInertSelectIndex(i: number, v: string, e) {
    this.props.onChange(e, v);
    this.setState({
      selectedIndex: i,
      isExpanded: false
    });
    console.log('third thing')
  }
}
