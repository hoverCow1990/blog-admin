import React,{Component}from 'react'
import {
  Router,
  Route,
  Redirect
  // BrowserRouter,
  // HashRouter,
  // Match,
  // Link,
  // hashHistory,
  // IndexLink
} from 'react-router'
import createHashHistory from 'history/createHashHistory'
import LoginView from '../views/login'

const history = createHashHistory()

class MainRouter extends Component{
  constructor(){
    super()
  }
  render(){
      return (
        <Router history={history}>
          <div>
            <Route exact path="/" component={LoginView}/>
            <Route path="/user/:id" component={User}/>
          </div>
        </Router>
      )
    }
}

const User = ({match})=> {
   return  <LoginView match={match}></LoginView>
}

export default MainRouter;
