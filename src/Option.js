import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

const Option = createReactClass({
  propTypes: {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,

    isHovering: PropTypes.bool,
    isActive: PropTypes.bool,
    isSelected: PropTypes.bool,
    isDisplaying: PropTypes.bool,

    onMouseOver: PropTypes.func.isRequired,
    onMouseUp: PropTypes.func.isRequired,
    onMouseDown: PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      onMouseOver: () => {},
      onMouseUp: () => {},
      onMouseDown: () => {}
    };
  },

  shouldComponentUpdate(nextProps) {
    return (
      this.props.isHovering !== nextProps.isHovering ||
      this.props.isActive !== nextProps.isActive ||
      this.props.isSelected !== nextProps.isSelected ||
      this.props.isDisplaying ||
      this.props.isDisplaying !== nextProps.isDisplaying
    );
  },

  getRenderable() {
    var children = this.props.children;
    return typeof children === 'function'
      ? children(
          this.props.isHovering,
          this.props.isActive,
          this.props.isSelected,
          this.props.isDisplaying
        )
      : children;
  },

  render() {
    return (
      <div
        onMouseOver={this.props.onMouseOver}
        onMouseUp={this.props.onMouseUp}
        onMouseDown={this.props.onMouseDown}
      >
        {this.getRenderable()}
      </div>
    );
  }
});

export default Option;
