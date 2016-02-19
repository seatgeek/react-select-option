import React from 'react';

var sequenceFuncs = (...functions) => {
  return (...args) => {
    functions.forEach(f => {
      f.apply(f, args);
    });
  };
};

const Option = React.createClass({
  propTypes: {
    children: React.PropTypes.node.isRequired,
    value: React.PropTypes.string.isRequired,
    text: React.PropTypes.string,

    // Private Props
    onMouseOver: React.PropTypes.func.isRequired,
    onMouseUp: React.PropTypes.func.isRequired,
    onMouseDown: React.PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      onMouseOver: () => {},
      onMouseUp: () => {},
      onMouseDown: () => {}
    };
  },

  render() {
    return <div onMouseOver={this.props.onMouseOver}
                onMouseUp={this.props.onMouseUp}
                onMouseDown={this.props.onMouseDown}>
      {this.props.children}
    </div>;
  }
});

export default Option;
