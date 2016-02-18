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

  handleBackingSelectChange(e) {
    this.setState({
      isExpanded: false
    });
    if (this.props.onChange) {
      this.props.onChange(e, e.target.value);
    }
  },

  /*
   HACK FOR: Firefox!

   Tonight's lucky hack winner is Firefox. When the
   keyboard is used to change a selection in the
   <select> box, the onChange event is not fired.

   To work around this, we listen for the onKeyUp
   event and trigger a value change
   */
  handleBackingSelectKey(e) {
    if (this.props.onChange) {
      this.props.onChange(e, e.target.value);
    }
  },

  handleBackingSelectFocus(e) {
    this.setState({
      isFocused: true
    });
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  },

  handleBackingSelectBlur() {
    this.setState({
      isFocused: false
    });
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  },

  generateHandlers() {
    return {
      onFocus: this.handleBackingSelectFocus,
      onBlur: this.handleBackingSelectBlur,
      onChange: this.handleBackingSelectChange,
      onKeyUp: this.handleBackingSelectKey
    };
  },

  buildShadowSelect() {
    const children = React.Children.toArray(this.props.children);
    return <select {...this.generateHandlers()}
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
