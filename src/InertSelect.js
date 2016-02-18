import React from 'react';

const InertSelect = React.createClass({
  propTypes: {
    style: React.PropTypes.object,

    isExpanded: React.PropTypes.bool.isRequired,
    isFocused: React.PropTypes.bool.isRequired,
    value: React.PropTypes.any,
    children: React.PropTypes.arrayOf(React.PropTypes.node),

    onExpanded: React.PropTypes.func,
    onClosed: React.PropTypes.func,
    onHoverIndex: React.PropTypes.func,
    onActiveIndex: React.PropTypes.func,
    onSelectIndex: React.PropTypes.func
  },

  getDisplayingChild() {
    return React.Children.toArray(this.props.children).filter(c => {
      return c.props.value === this.props.value;
    });
  },

  render() {
    return <div style={{maxWidth: 200}}>
      <div style={{border: `1px solid ${this.props.isFocused ? '#88f' : '#555'}`}}
           onClick={this.props.isExpanded ? this.props.onClosed : this.props.onExpanded}>
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
