import React from 'react';
import Option from './Option';
import Invariant from 'invariant';
import InertSelect from './InertSelect';

import selectBackingHandlers from './selectBackingHandlers';
import selectInertHandlers from './selectInertHandlers';

const hiddenSelectStyle = {
  height: 0,
  width: 0,
  margin: 0,
  border: 0,
  padding: 0,
  outline: 'none',
  opacity: 0,
  position: 'absolute'
};

const Select = React.createClass({
  ...selectBackingHandlers,
  ...selectInertHandlers,
  propTypes: {
    value: React.PropTypes.string.isRequired,
    children: React.PropTypes.arrayOf(React.PropTypes.node).isRequired,

    onOptionHover: React.PropTypes.func,
    onOptionActive: React.PropTypes.func,
    onOptionSelected: React.PropTypes.func,

    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      onOptionHover: () => {},
      onOptionActive: () => {},
      onOptionSelected: () => {},
    }
  },

  getInitialState() {
    return {
      isExpanded: false,
      isFocused: false,

      hoverIndex: undefined,
      activeIndex: undefined,
      selectedIndex: undefined
    };
  },

  buildBackingSelect(x) {
    const children = React.Children.toArray(this.props.children);
    return <select {...this.generateBackingHandlers()}
      style={hiddenSelectStyle}
      ref={s => this._backingSelect = s}
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
      {this.buildBackingSelect()}
      <InertSelect
        {...this.generateInertHandlers()}
        value={this.props.value}
        isExpanded={this.state.isExpanded}
        isFocused={this.state.isFocused}

        hoverIndex={this.state.hoverIndex}
        activeIndex={this.state.activeIndex}
        selectedIndex={this.state.selectedIndex}
      >
        {this.props.children}
      </InertSelect>
    </div>;
  }
});

export default Select;
