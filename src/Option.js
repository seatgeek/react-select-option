import React from 'react';
import Invariant from 'invariant';

var sequenceFuncs = (...functions) => {
  return (...args) => {
    functions.forEach(f => {
      f.apply(f, args);
    });
  };
};

const Option = React.createClass({
  propTypes: {
    children: React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.func]).isRequired,
    value: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,

    isHovering: React.PropTypes.bool,
    isActive: React.PropTypes.bool,
    isSelected: React.PropTypes.bool,

    onMouseOver: React.PropTypes.func.isRequired,
    onMouseUp: React.PropTypes.func.isRequired,
    onMouseDown: React.PropTypes.func.isRequired
  },

  shouldComponentUpdate(nextProps) {
    return this.props.isHovering !== nextProps.isHovering ||
        this.props.isActive !== nextProps.isActive ||
        this.props.isSelected !== nextProps.isSelected;
  },

  getDefaultProps() {
    return {
      onMouseOver: () => {},
      onMouseUp: () => {},
      onMouseDown: () => {}
    };
  },

  getRenderable() {
    var children = this.props.children;
    return typeof children === 'function'
      ? children(this.props.isHovering, this.props.isActive, this.props.isSelected)
      : children;
  },

  render() {
    return <div onMouseOver={this.props.onMouseOver}
                onMouseUp={this.props.onMouseUp}
                onMouseDown={this.props.onMouseDown}>
      {this.getRenderable()}
    </div>;
  }
});

export default Option;
