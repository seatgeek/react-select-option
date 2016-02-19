var React = require('react');
var ReactDOM = require('react-dom');
var Select = require('../../src');

var App = React.createClass({
  getInitialState() {
    return {
      value: 'A'
    };
  },

  handleChange(e) {
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
          <Select.Option value="A">Apple</Select.Option>
          <Select.Option value="B">Banana</Select.Option>
          <Select.Option value="D">Bandoneon</Select.Option>
          <Select.Option value="E">Cranberry</Select.Option>
        </Select.Select>
        <input/>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));
