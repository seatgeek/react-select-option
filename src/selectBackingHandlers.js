/* @flow */

import React from 'react';

type BackingHandlers = {
  onFocus: (e: React.SyntheticFocusEvent) => void;
  onBlur: (e: React.SyntheticFocusEvent) => void;
  onChange: (e: React.SyntheticEvent) => void;
  onKeyUp: (e: React.SyntheticKeyboardEvent) => void;
};

export default {
  /*
   BACKING HANDLERS
   These handlers respond to events on the backing
   select HTML element. This allows for the automatic
   implementation of things like keyboard focus, including
   the element in the tab order, and autocomplete filling.
   */
  generateBackingHandlers(): BackingHandlers {
    return {
      onFocus: this.handleBackingSelectFocus,
      onBlur: this.handleBackingSelectBlur,
      onChange: this.handleBackingSelectChange,
      onKeyUp: this.handleBackingSelectKey
    };
  },

  handleBackingSelectChange(e: React.SyntheticEvent) {
    this.setState({
      isExpanded: false
    });
    if (this.props.onChange) {
      this.props.onChange(e, e.target.value);
    }
  },

  /*
   HACK FOR: Firefox!

   Tonight's lucky hack winner is Firefox. When the
   keyboard is used to change a selection in the
   <select> box, the onChange event is not fired.

   To work around this, we listen for the onKeyUp
   event and trigger a value change
   */
  handleBackingSelectKey(e: React.SyntheticKeyboardEvent) {
    if (this.props.onChange) {
      this.props.onChange(e, e.target.value);
    }
  },

  handleBackingSelectFocus(e: React.SyntheticFocusEvent) {
    this.setState({
      isFocused: true
    });
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  },

  handleBackingSelectBlur(e: React.SyntheticFocusEvent) {
    this.setState({
      isFocused: false
    });
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  }
}
