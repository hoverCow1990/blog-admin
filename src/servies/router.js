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
import LoginView from '@/views/login/login'
import Category from '@/views/category/category'
import TestView from '@/views/test/test'

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
            <Route path="/home" render={() => <div>Home</div>}/>
            <CowRoute path="/cool/:id" component={TestView}/>
          </div>
        </Router>
      )
    }
}

const User = ({match})=> {
   return  <LoginView match={match}></LoginView>
}

const CowRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    <Component {...props}/>
  )}/>
)

export default MainRouter;
