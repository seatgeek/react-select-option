import React from 'react';
import ReactDOM from 'react-dom';
import Option from './Option';
import Invariant from 'invariant';
import InertSelect from './InertSelect';

import selectBackingHandlers from './selectBackingHandlers';
import selectInertHandlers from './selectInertHandlers';
import utilityFunctions from './utilityFunctions';

const ESCAPE_KEY = 27;
const TAB_KEY = 9;
const hiddenSelectStyle = {
  // HACK: for Safari. If the hidden select has
  // size 0 then it is skipped in the taborder.
  height: 0.1,
  width: 0.1,
  margin: 0,
  border: 0,
  padding: 0,
  outline: 'none',
  opacity: 0,
  position: 'absolute'
};

const Select = React.createClass({
  propTypes: {
    value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]).isRequired,
    children: React.PropTypes.arrayOf(React.PropTypes.node).isRequired,
    autoComplete: React.PropTypes.string,

    // The name is an unimportant string we attach to the
    // <select> for purposes of testing.
    name: React.PropTypes.string,

    disableDropdown: React.PropTypes.bool,
    useNative: React.PropTypes.bool,

    onOptionHover: React.PropTypes.func.isRequired,
    onOptionActive: React.PropTypes.func.isRequired,

    onChange: React.PropTypes.func.isRequired,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func,

    style: React.PropTypes.shape({
      containerStyle: React.PropTypes.object,
      selectContainerStyle: React.PropTypes.object,
      optionsContainerStyle: React.PropTypes.object
    }),
    displayingChildRenderer: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      onOptionHover: () => {},
      onOptionActive: () => {},
      onChange: () => {},
      style: {}
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
    if (this.props.useNative) {
      return;
    }

    try {
      this.globalEventListener = window.addEventListener('click', e => {
        var inertSelect = ReactDOM.findDOMNode(this._inertSelect);

        if (!inertSelect) {
          return;
        }

        if (inertSelect.contains(e.target)) {
          return;
        }

        this.setState({
          isFocused: false,
          isExpanded: false,
          activeIndex: undefined,
          hoverIndex: undefined
        });

        // On Chrome, the click event does not appear to get transmitted,
        // causing the focus to still stay on the backing select. This
        // makes future keystrokes get transmitted to the backing select.
        if (e.target.focus) {
          e.target.focus();
        }
      });

      // An escape keypress closes the dropdown but does not make the
      // select lose focus.
      this.keyupEventListener = window.addEventListener('keyup', e => {
        if (e.keyCode === ESCAPE_KEY) {
          this.setState({
            isExpanded: false,
            activeIndex: undefined,
            hoverIndex: undefined
          });
        }
      });

      // A tab keypress while the menu is expanded does nothing at all. The
      // focus and selection remain unchanged.
      // Note that this is the behavior in Chrome and Safari. In Firefox a tab
      // while the menu is focused immediately moves focus to then next tabindex.
      // Firefox selects, however, behave quite differently in general. Elements
      // are selected immediately through keyboard navigation, for one, so it makes
      // sense for a tab to just change focus.
      this.keydownEventListener = window.addEventListener('keydown', e => {
        if (e.keyCode === TAB_KEY && this.state.isExpanded) {
          e.preventDefault();
          e.stopPropagation();
          this._backingSelect.focus();
          this.setState({
            isFocused: true
          });
        }
      });
    } catch (e) {}
  },

  componentWillUnmount() {
    try {
      window.removeEventListener(this.globalEventListener);
    } catch (e) {}
    try {
      window.removeEventListener(this.keyupEventListener);
    } catch (e) {}
    try {
      window.removeEventListener(this.keydownEventListener);
    } catch (e) {}
  },

  /*
    Imports methods from three other files so that
    this one is not ridiculously sized.
   */
  ...selectBackingHandlers,
  ...selectInertHandlers,
  ...utilityFunctions,

  buildBackingSelect() {
    const children = React.Children.toArray(this.props.children);
    return <select {...this.generateBackingHandlers()}
      style={this.props.useNative ? {} : hiddenSelectStyle}
      ref={s => (this._backingSelect = s)}
      // HACK: for Firefox!
      // Further reading: this most fun issue https://bugzilla.mozilla.org/show_bug.cgi?id=126379
      size={this.props.useNative ? '1' : '2'}
      autoComplete={this.props.autoComplete}
      name={this.props.name}
      value={this.props.value}>
      {
        children.map((c, i) => {
          Invariant(c.type === Option, `The Select component should
          only take Select.Option instances as children.`);
          return <option value={c.props.value} key={c.props.value} index={i}>
            {c.props.label || c.props.value}
          </option>;
        })
      }
    </select>;
  },

  renderInertSelect() {
    return <InertSelect
      ref={s => (this._inertSelect = s)}
      {...this.generateInertHandlers()}
      value={this.props.value}
      isExpanded={this.state.isExpanded}
      isFocused={this.state.isFocused}
      disableDropdown={this.props.disableDropdown}

      displayingChildRenderer={this.props.displayingChildRenderer}
      style={this.props.style}

      hoverIndex={this.state.hoverIndex}
      activeIndex={this.state.activeIndex}
      selectedIndex={this.getSelectedIndex(this.props.value)}
    >
      {this.props.children}
    </InertSelect>;
  },

  render() {
    return <div style={this.props.style.containerStyle || {}}>
      {this.buildBackingSelect()}
      {!this.props.useNative && this.renderInertSelect()}
    </div>;
  }
});

export default Select;
