var React = require('react');
var ReactDOM = require('react-dom');
var Select = require('../../src');

var App = React.createClass({
  getInitialState() {
    return {
      value: 'A'
    };
  },

  handleChange(e, value) {
    console.log('changin', e);
    this.setState({
      value
    });
  },

  render() {
    return (
      <div>
        <Select.Select onChange={this.handleChange} value={this.state.value}>
          <Select.Option value="A">Apple</Select.Option>
          <Select.Option value="B">Banana</Select.Option>
          <Select.Option value="D">Bandoneon</Select.Option>
          <Select.Option value="E">Cranberry</Select.Option>
        </Select.Select>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));
