var React = require('react');
var ReactDOM = require('react-dom');
var Select = require('../../src');

const staticData = [
  {value: 'A', text: 'Apple'},
  {value: 'B', text: 'Banana'},
  {value: 'D', text: 'Bandoneon'},
  {value: 'E', text: 'Cranberry'}
];

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
        <input/>
        <Select.Select onChange={this.handleChange}
                       onOptionHover={this.handleHover}
                       disableDropdown
                       value={this.state.value}>
          {staticData.map(d => {
            return <Select.Option value={d.value} text={d.text} key={d.value}>
              {(hover, active, selected) => {
                return d.text + (hover ? 'H' : '') + (active ? '@' : '') + (selected ? '§' : '');
              }}
            </Select.Option>;
          })}
        </Select.Select>
        <input/>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));
