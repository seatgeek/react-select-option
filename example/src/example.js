var React = require('react');
var ReactDOM = require('react-dom');
var Select = require('../../src');

const staticData = [
  {value: 'A', text: 'Apple'},
  {value: 'B', text: 'Banana'},
  {value: 'F', text: 'Bandoneon'},
  {value: 'D', text: 'Durian'},
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
        <input className="input-one"/>
        <Select.Select onChange={this.handleChange}
                       onOptionHover={this.handleHover}
                       value={this.state.value}>
          {staticData.map((d, i) => {
            return <Select.Option value={d.value} text={d.text} key={d.value}>
              {(hover, active, selected) => {
                return <div className={`select-option-${i}`}>
                  {d.text + (hover ? 'hovering' : '') + (active ? 'active' : '') + (selected ? 'selected' : '')}
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
