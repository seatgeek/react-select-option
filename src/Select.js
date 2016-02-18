import React from 'react';
import Option from './Option';
import Invariant from 'invariant';
import InertSelect from './InertSelect';

import selectBackingHandlers from './selectBackingHandlers';
import selectInertHandlers from './selectInertHandlers';

 //const hiddenSelectStyle = {
 // height: 0,
 // width: 0,
 // margin: 0,
 // border: 0,
 // padding: 0,
 // outline: 'none',
 // opacity: 0
 //};

const Select = React.createClass(
  Object.assign(selectBackingHandlers, selectInertHandlers, {
  propTypes: {
    value: React.PropTypes.string.isRequired,
    children: React.PropTypes.arrayOf(React.PropTypes.node).isRequired,

    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func
  },

  getInitialState() {
    return {
      isExpanded: false,
      isFocused: false
    };
  },

  buildShadowSelect() {
    const children = React.Children.toArray(this.props.children);
    return <select {...this.generateBackingHandlers()}
      value={this.props.value}>
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
        {...this.generateInertHandlers()}
        value={this.props.value}
        isExpanded={this.state.isExpanded}
        isFocused={this.state.isFocused}
      >
        {this.props.children}
      </InertSelect>
    </div>;
  }
}));

export default Select;
