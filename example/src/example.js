var React = require('react');
var ReactDOM = require('react-dom');
var Select = require('../../src');

var App = React.createClass({
  onChange(e) {
    console.log(e);
  },

	render () {
		return (
			<div>
				<Select.Select onChange={this.onChange}>
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
