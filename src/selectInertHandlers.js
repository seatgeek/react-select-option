export default {
  /*
   INERT HANDLERS
   These handlers respond to events on the inert select
   and help to make it behave like a real select, including
   opening it, closing it, hovering over elements, keyboard
   control selections, and so forth.
   */
  generateInertHandlers() {
    return {
      onExpanded: this.handleInertSelectExpanded,
      onClosed: this.handleInertSelectClosed
    };
  },

  handleInertSelectExpanded() {
    this.setState({
      isExpanded: true,
      isFocused: true
    });
    this._backingSelect.focus();
  },

  handleInertSelectClosed() {
    this.setState({
      isExpanded: false,
      isFocused: true
    });
  }
}
