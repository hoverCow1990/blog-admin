import React, { Component } from 'react'
import MainRouter from '@/servies/router'
import './app.less'

class App extends Component {
  constructor () {
    super()
    this.state = {}
  }
  render () {
    return (
      <div id="app">
        <MainRouter />
      </div>
    );
  }
}

export default App;
