import React from 'react';

const Option = React.createClass({
  propTypes: {
    children: React.PropTypes.node.isRequired,
    value: React.PropTypes.any.isRequired,
    text: React.PropTypes.string
  },
  render() {
    return <div>Stuff</div>;
  }
});

export default Option;
