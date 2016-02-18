import React from 'react';
import Option from './Option';
import Invariant from 'invariant';
import InertSelect from './InertSelect';

// const hiddenSelectStyle = {
//  height: 0,
//  width: 0,
//  margin: 0,
//  border: 0,
//  padding: 0,
//  outline: 'none',
//  opacity: 0
// };

const Select = React.createClass({
  propTypes: {
    value: React.PropTypes.any.isRequired,
    children: React.PropTypes.arrayOf(React.PropTypes.node).isRequired
  },

  getInitialState() {
    return {
      isExpanded: false,
      isFocused: false
    };
  },

  generateHandlers() {

  },

  buildShadowSelect() {
    const children = React.Children.toArray(this.props.children);
    return <select>
      {
        children.map(c => {
          Invariant(c.type === Option, `The Select component should
          only take Select.Option instances as children.`);
          return <option value={c.props.value} key={c.props.value}>
           {typeof c.props.children === 'string' ? c.props.children : c.props.text}
          </option>;
        })
      }
    </select>;
  },

  render() {
    return <div>
      {this.buildShadowSelect()}
      <InertSelect
        value={this.props.value}
        isExpanded={this.state.isExpanded}
        isFocused={this.state.isFocused}
      >
        {this.props.children}
      </InertSelect>
    </div>;
  }
});

export default Select;
