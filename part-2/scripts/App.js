import React from 'react';

export default class DisplayList extends React.Component {

  constructor() {
    super();
    this.displayItem = this.displayItem.bind(this);
  }

  displayItem(item) {
    return <li key={item}>
            {item}
            <a  href='#'
                onClick={this.props.handleClickForDelete.bind(this, item)}>[x]</a>
           </li>
  }


  render() {
    return (
      <ul>{ this.props.items.map(this.displayItem) } </ul>
    )
  }

}

export default class App extends React.Component {

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClickForDelete = this.handleClickForDelete.bind(this);
    this.state = { text: '', items: [] }
  }

  handleClickForDelete(itemToDelete) {
    var newItems = this.state.items.filter(function(item){
      return item != itemToDelete
    })

    this.setState({ items: newItems });
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
  }

  render() {
    return (
      <div>
        <h1>TODO</h1>

        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={this.state.text}></input>
          <button>Submit</button>
        </form>

        <DisplayList  items={this.state.items}
                      handleClickForDelete={this.handleClickForDelete} />

      </div>
    );
  }

}
