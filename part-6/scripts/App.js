import React from 'react';

class DisplayItem extends React.Component {

  constructor() {
    super();
    this.handleClickForCompletion = this.handleClickForCompletion.bind(this);
    this.state = { done: false, style: {} }
  }

  handleClickForCompletion(e) {
    var done = !this.state.done;
    this.setState({ done: done })

    if (done) {
      console.log('setting state');
      this.setState({ style: { textDecoration: 'line-through' }})
    } else {
      this.setState({ style: { }})
    }
  }

  render() {

    var style = {
      padding: '5px',
      fontSize: '20px'
    };

    console.log(this.props.item);

    return (
      <li key={this.props.item} style={style}>
        <input type="checkbox" name="{this.props.item}" value="{this.props.item}" checked={this.state.done} onChange={this.handleClickForCompletion}  />
        <span style={ this.state.style }>
          {this.props.item}
        </span>
        <a  href='#' onClick={this.props.handleClickForDelete.bind(this, this.props.item)}>[x]</a>
       </li>

    )
  }

}


class DisplayList extends React.Component {

  constructor() {
    super();
    this.displayItem = this.displayItem.bind(this);
  }

  displayItem(item) {
    return <DisplayItem item={item} handleClickForDelete={this.props.handleClickForDelete} />
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

        <p>
          Count of pending tasks : { this.state.items.length }
        </p>

        <DisplayList  items={this.state.items}
                      handleClickForDelete={this.handleClickForDelete} />

      </div>
    );
  }

}
