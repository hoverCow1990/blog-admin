import React, { Component } from 'react';
import AA from './components/AA'
import logo from './logo.svg';
import './App.css';
import MainRouter from './servies/router'
class App extends Component {
  constructor () {
    super()
    this.state = {
      list: [{
        name: 'nomo',
        age: 12
      }, {
        name: 'vovo',
        age: 22
      }]
    }
  }
  componentWillReceiveProps(nextProps,a,b){
    console.log(nextProps,a,b)
  }
  render () {
    // console.log(match)
    let list = this.state.list
    return (
      <div className="App">
        <div style={{height:'50px',background:'#333',textAlign:'center',color:'#eee'}}>nav</div>
        <MainRouter/>
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
