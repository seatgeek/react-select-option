/* @flow */

import React, { type Element } from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

const InertSelect = createReactClass({
  propTypes: {
    disableDropdown: PropTypes.bool,
    isExpanded: PropTypes.bool.isRequired,
    isFocused: PropTypes.bool.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    children: PropTypes.arrayOf(PropTypes.node),
    containerClassName: PropTypes.string,
    optionsContainerClassName: PropTypes.string,

    onExpanded: PropTypes.func,
    onClosed: PropTypes.func,

    hoverIndex: PropTypes.number,
    activeIndex: PropTypes.number,
    selectedIndex: PropTypes.number,

    onHoverIndex: PropTypes.func.isRequired,
    onActiveIndex: PropTypes.func.isRequired,
    onSelectIndex: PropTypes.func.isRequired,

    style: PropTypes.shape({
      selectContainerStyle: PropTypes.object,
      optionsContainerStyle: PropTypes.object
    }),
    displayingChildRenderer: PropTypes.func
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
  createInteractiveOptions(): Array<Element<any>> {
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

  getDisplayingChild(): ?Element<any> {
    var child = React.Children.toArray(this.props.children).filter(c => {
      return c.props.value === this.props.value;
    })[0];

    if (!child) {
      return null;
    }

    return React.cloneElement(child, {
      isDisplaying: true
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

    return <div className={this.props.containerClassName} style={this.props.style.selectContainerStyle || {}}>
      <div onClick={this.props.isExpanded ? this.props.onClosed : this.props.onExpanded}>
        {
          this.props.displayingChildRenderer(child, this.props.isExpanded, this.props.isFocused)
        }
      </div>
      <div style={optionsStyle} className={this.props.optionsContainerClassName}>
        {this.createInteractiveOptions()}
      </div>
    </div>;
  }
});

export default InertSelect;
