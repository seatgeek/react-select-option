import React from 'react';
import ReactDOM from 'react-dom';

const KEY_DOWN = 40;
const KEY_UP = 38;
const KEY_ENTER = 13;
const KEY_TAB = 9;

export default {
  /*
   BACKING HANDLERS
   These handlers respond to events on the backing
   select HTML element. This allows for the automatic
   implementation of things like keyboard focus, including
   the element in the tab order, and autocomplete filling.
   */
  generateBackingHandlers() {
    return {
      onFocus: this.handleBackingSelectFocus,
      onBlur: this.handleBackingSelectBlur,
      onChange: this.handleBackingSelectChange,
      onKeyUp: this.handleBackingSelectKey,
      onKeyDown: this.handleBackingSelectKeyDown,
      onKeyPress: this.handleBackingSelectKeyboardActions
    };
  },

  handleBackingSelectChange(e) {
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
  handleBackingSelectKey(e) {
    if (this.props.onChange) {
      this.props.onChange(e, e.target.value);
    }
  },

  /*
    Keyboard Section!
    This section handles all keypress events. Naturally,
    such events pass through the backing select.
   */
  handleBackingSelectKeyDown(e) {
    // Allow focus changing events as well as
    // page refresh events to pass through.
    // What other keys do we need to allow through?
    if (e.keyCode === KEY_TAB) {
      this.setState({
        isFocused: false
      });
      return;
    } else if (e.metaKey) {
      return;
    }

    /*
     HACK FOR: Chrome!

     Tonight's lucky hack winner is Chrome. Even though
     we set the select box to have height 0, width 0,
     opacity 0, and so on and so forth in an attempt to
     consign it to the dustbin of invisibility, Chrome finds
     that it is a good idea to show the select dropdown
     menu.

     Here we stop that silly thing from happening and trigger our
     custom menu instead.
     */
    if (e.keyCode === KEY_UP || e.keyCode === KEY_DOWN) {
      e.preventDefault();
    }

    /*
      Expands the menu when necessary and moves the
      keyboard hover state around.
     */
    var newStateObject = {};
    var numberChildren = React.Children.count(this.props.children);

    if (e.keyCode === KEY_UP || e.keyCode === KEY_DOWN) {
      newStateObject.isExpanded = true;
    } else if (e.keyCode === KEY_ENTER && this.state.hoverIndex !== undefined) {
      this.props.onChange(e, this.getHoveredValue(this.state.hoverIndex));
      this.setState({
        hoverIndex: undefined,
        isExpanded: false
      });
      return;
    } else {
      return;
    }

    if (this.state.hoverIndex !== undefined) {
      newStateObject.hoverIndex = e.keyCode === KEY_DOWN
        ? Math.min(this.state.hoverIndex + 1, numberChildren - 1)
        : Math.max(0, this.state.hoverIndex - 1);
    } else {
      newStateObject.hoverIndex = this.getSelectedIndex(this.props.value);
    }

    ReactDOM.findDOMNode(this._backingSelect).value = this.props.value;
    this.setState(newStateObject);
  },

  handleBackingSelectFocus(e) {
    this.setState({
      isFocused: true
    });
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  },

  /*
    Let us talk about the relation of isInSelectingState to
    the blur event.

    If we are in a selecting state (i.e. a mousedown event has
    been received on an Option), this means that in the next tick a
    blur will occur on the backing <select> element. This is
    undesirable for two reasons.

      1. The expanded container will collapse on blur.
      2. The
   */
  handleBackingSelectBlur(e) {
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }

    if (this.state.isFocused && !this.props.useNative) {
      this._backingSelect.focus();
    }
  }
};
