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
            <Route path="/category" component={Category}/>
          </div>
        </Router>
      )
    }
}

const User = ({match})=> {
   return  <LoginView match={match}></LoginView>
}

export default MainRouter;
