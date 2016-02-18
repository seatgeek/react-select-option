import React from 'react';

var InertSelect = React.createClass({
  propTypes: {
    style: React.PropTypes.object,

    isExpanded: React.PropTypes.bool.isRequired,
    isFocused: React.PropTypes.bool.isRequired,
    value: React.PropTypes.any,
    children: React.PropTypes.arrayOf(React.PropTypes.node)
  },

  getDisplayingChild() {
    return React.Children.toArray(this.props.children).filter(c => {
      return c.props.value === this.props.value;
    });
  },

  render() {
    return <div style={{maxWidth: 200}}>
      <div style={{border: `1px solid ${this.props.isFocused ? '#88f' : '#555'}`}}>
        {this.getDisplayingChild()}
      </div>
      {this.props.isExpanded &&
        <div>
          {this.props.children}
        </div>
      }
    </div>;
  }
});

export default InertSelect;
