import React from 'react';

const Option = React.createClass({
  propTypes: {
    children: React.PropTypes.node.isRequired,
    value: React.PropTypes.string.isRequired,
    text: React.PropTypes.string
  },
  render() {
    return <div>{this.props.children}</div>;
  }
});

export default Option;
