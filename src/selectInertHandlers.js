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
      onClosed: this.handleInertSelectClosed,

      onHoverIndex: this.handleInertHoverIndex,
      onActiveIndex: this.handleInertActiveIndex,
      onSelectIndex: this.handleInertSelectIndex
    };
  },

  handleInertSelectExpanded(e) {
    this.setState({
      isExpanded: true,
      isFocused: true
    });
    this._backingSelect.focus();
  },

  handleInertSelectClosed(e) {
    this.setState({
      isExpanded: false,
      hoverIndex: undefined,
      activeIndex: undefined,
      isFocused: true
    });
  },

  handleInertHoverIndex(i, v, e) {
    this.props.onOptionHover(e, v);
    this.setState({
      hoverIndex: i
    });
  },

  handleInertActiveIndex(i, v, e) {
    this.setState({
      activeIndex: i
    });
    this.props.onOptionActive(e, v);
  },

  handleInertSelectIndex(i, v, e) {
    this.props.onChange(e, v);
    this.setState({
      isExpanded: false,
      activeIndex: undefined,
      hoverIndex: undefined
    });
  }
};
