import React from 'react';
import ReactDOM from 'react-dom';
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
  propTypes: {
    value: React.PropTypes.string.isRequired,
    children: React.PropTypes.arrayOf(React.PropTypes.node).isRequired,

    onOptionHover: React.PropTypes.func.isRequired,
    onOptionActive: React.PropTypes.func.isRequired,

    onChange: React.PropTypes.func.isRequired,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      onOptionHover: () => {},
      onOptionActive: () => {},
      onChange: () => {},
    };
  },

  getInitialState() {
    return {
      isExpanded: false,
      isFocused: false,

      // This sequence of events occurs when we click on
      // an option in the inert select:
      // mouseDown + backing select blur -> mouseup
      // we keep
      isInVirtualFocusState: false,

      hoverIndex: undefined,
      activeIndex: undefined
    };
  },

  /*
    Global Blur Event Listeners
   */
  componentDidMount() {
    try {
      this.globalEventListener = window.addEventListener('click', e => {
        var inertSelect = ReactDOM.findDOMNode(this._inertSelect);
        if (inertSelect.contains(e.target)) {
          return;
        }

        this.setState({
          isFocused: false,
          isExpanded: false
        });
      });
    } catch (e) {}
  },

  componentWillUnmount() {
    try {
      window.removeEventListener(this.globalEventListener);
    } catch (e) {}
  },

  /*
    Includes backing and inert handlers
    so that this file is not ridiculously sized
   */
  ...selectBackingHandlers,
  ...selectInertHandlers,

  // Returns the value of the element that is currently
  // being hovered
  getHoveredValue(hoverIndex) {
    return React.Children.toArray(this.props.children)[hoverIndex].props.value;
  },

  getSelectedIndex(value) {
    return React.Children.map(this.props.children, c => c.props.value).indexOf(value);
  },

  buildBackingSelect() {
    const children = React.Children.toArray(this.props.children);
    return <select {...this.generateBackingHandlers()}
      style={hiddenSelectStyle}
      ref={s => (this._backingSelect = s)}
      value={this.props.value}>
      {
        children.map((c, i) => {
          Invariant(c.type === Option, `The Select component should
          only take Select.Option instances as children.`);
          return <option value={c.props.value} key={c.props.value} index={i}>
            {c.props.text || c.props.value}
          </option>;
        })
      }
    </select>;
  },

  render() {
    return <div>
      {this.buildBackingSelect()}
      <InertSelect
        ref={s => (this._inertSelect = s)}
        {...this.generateInertHandlers()}
        value={this.props.value}
        isExpanded={this.state.isExpanded}
        isFocused={this.state.isFocused}

        hoverIndex={this.state.hoverIndex}
        activeIndex={this.state.activeIndex}
        selectedIndex={this.getSelectedIndex(this.props.value)}
      >
        {this.props.children}
      </InertSelect>
    </div>;
  }
});

export default Select;
