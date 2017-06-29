import React, { Component } from 'react';

class App extends Component {
  constructor () {
    super()
    this.state = {
      aa: 1,
      bb: 'cow'
    }
  }
  render() {
    let {momo, list, handlerList} = this.props
    let {bb, aa} = this.state
    let {handler} = this
    // list = this.getList(list)
    return (
      <div className="heihei">
        {momo}
        {this.getList(list)}
        <div className={bb}>
          {aa}
        </div>
        <button onClick={() => this.handler()}>22</button>
        <button onClick={() => this.props.handlerList()}>33</button>
      </div>
    );
  }
  getList (list) {
    return list.map((item, index) =>
      <li key={index}>
        name: {item.name}11
        <p>age: {item.age}</p>
      </li>
    )
  }
  handler () {
    this.setState({
      aa: ++this.state.aa,
      bb: 'cow2'
    })
  }
}

export default App;
