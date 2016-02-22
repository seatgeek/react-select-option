var React = require('react');
var ReactDOM = require('react-dom');
var Select = require('../../src');
var exampleConstants = require('./exampleConstants');

var App = React.createClass({
  getInitialState() {
    return {
      value: 'A'
    };
  },

  handleChange(e, value) {
    this.setState({
      value: value
    });
  },

  handleHover(event, index) {
  },

  render() {
    return (
      <div>
        <div className="area-for-global-focus-loss" style={{width: 10, height: 10}}/>
        <input className="input-one"/>
        <Select.Select onChange={this.handleChange}
                       onOptionHover={this.handleHover}
                       value={this.state.value}>
          {exampleConstants.data.map((d, i) => {
            return <Select.Option value={d.value} text={d.text} key={d.value}>
              {(hover, active, selected) => {
                console.log('this function is being called');
                return <div className={`${exampleConstants.SELECT_CLASS_PREFIX}-${i}${selected ? '-selected' : ''}`}>
                  {d.text +
                  (hover ? exampleConstants.HOVERING_SYMBOL : '') +
                  (active ? exampleConstants.ACTIVE_SYMBOL : '') +
                  (selected ? exampleConstants.SELECTED_SYMBOL : '')}
                </div>;
              }}
            </Select.Option>;
          })}
        </Select.Select>
        <input className="input-three" />
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));
