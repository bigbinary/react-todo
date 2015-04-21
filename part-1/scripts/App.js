import React from 'react';

export default class App extends React.Component {

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { text: '', items: [] }
  }

  handleSubmit(e) {
    e.preventDefault();
    var text = this.state.text;
    var items = this.state.items.concat([text]);
    this.setState({ text: '', items: items });
  }

  handleChange(e) {
    var text = e.target.value;
    this.setState({ text: text });
    console.log(text);
  }

  render() {
    return (
      <div>
        <h1>TODO</h1>

        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={this.state.text}></input>
          <button>Submit</button>
        </form>

        <h3>{this.state.items.toString()}</h3>

      </div>
    );
  }



}
