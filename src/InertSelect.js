/* @flow */

import React from 'react';

const InertSelect = React.createClass({
  propTypes: {
    disableDropdown: React.PropTypes.bool,
    isExpanded: React.PropTypes.bool.isRequired,
    isFocused: React.PropTypes.bool.isRequired,
    value: React.PropTypes.any,
    children: React.PropTypes.arrayOf(React.PropTypes.node),

    onExpanded: React.PropTypes.func,
    onClosed: React.PropTypes.func,

    hoverIndex: React.PropTypes.number,
    activeIndex: React.PropTypes.number,
    selectedIndex: React.PropTypes.number,

    onHoverIndex: React.PropTypes.func.isRequired,
    onActiveIndex: React.PropTypes.func.isRequired,
    onSelectIndex: React.PropTypes.func.isRequired,

    style: React.PropTypes.shape({
      selectContainerStyle: React.PropTypes.object,
      optionsContainerStyle: React.PropTypes.object
    }),
    displayingChildRenderer: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      displayingChildRenderer: x => x,
      style: {}
    };
  },

  /*
    This attaches handlers to each prop.
   */
  createInteractiveOptions(): Array<React.Element<any, any, any>> {
    // Can we cache this?
    return React.Children.map(this.props.children, (c, i) => {
      return React.cloneElement(c, {
        isHovering: this.props.hoverIndex === i,
        isActive: this.props.activeIndex === i,
        isSelected: this.props.selectedIndex === i,
        onMouseOver: this.props.onHoverIndex.bind(null, i, c.props.value),
        onMouseDown: this.props.onActiveIndex.bind(null, i, c.props.value),
        onMouseUp: this.props.onSelectIndex.bind(null, i, c.props.value)
      });
    });
  },

  getDisplayingChild(): React.Element<any, any, any> {
    return React.Children.toArray(this.props.children).filter(c => {
      return c.props.value === this.props.value;
    });
  },

  render() {
    var optionsStyle = this.props.isExpanded && !this.props.disableDropdown
      ? {}
      : {display: 'none'};

    if (this.props.style.optionsContainerStyle) {
      optionsStyle = {
        ...optionsStyle,
        ...this.props.style.optionsContainerStyle
      };
    }

    var child = this.getDisplayingChild();

    return <div style={this.props.style.selectContainerStyle || {}}>
      <div onClick={this.props.isExpanded ? this.props.onClosed : this.props.onExpanded}>
        {
          this.props.displayingChildRenderer(child, this.props.isExpanded, this.props.isFocused)
        }
      </div>
      <div style={optionsStyle}>
        {this.createInteractiveOptions()}
      </div>
    </div>;
  }
});

export default InertSelect;
