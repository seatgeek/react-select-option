var React = require('react');
var ReactDOM = require('react-dom');
var Select = require('../../src');

const staticData = [
  {value: "A", text: "Apple"},
  {value: "B", text: "Banana"},
  {value: "D", text: "Bandoneon"},
  {value: "E", text: "Cranberry"}
];

var App = React.createClass({
  getInitialState() {
    return {
      value: 'A'
    };
  },

  handleChange(e) {
    console.log('changed')
    this.setState({
      value: e.target.value
    });
  },

  handleHover(event, index) {
    console.log('parenting hover', event, index)
  },

  render() {
    return (
      <div>
        <input/>
        <Select.Select onChange={this.handleChange}
                       onOptionHover={this.handleHover}
                       value={this.state.value}>
          {staticData.map(d => {
            return <Select.Option value={d.value}>
              {(hover, active, selected) => {
                console.log('a function call was made')
                return d.text + (hover ? '!' : '');
              }}
            </Select.Option>
          })}
        </Select.Select>
        <input/>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));
