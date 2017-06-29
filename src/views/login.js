import React, { Component } from 'react';

class App extends Component {
  constructor () {
    super()
    this.state = {
      a: 111
    }
  }
  render () {
    console.log(this.props.match.params.id)
    let {a} = this.state
    return (
      <div className="App">
        2222
      </div>
    );
  }
  handlerList () {
    console.log(this)
    let list = this.state.list
    list.reverse()
    this.setState({
      list
    })
  }
}

export default App;
