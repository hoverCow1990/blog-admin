import React,{Component}from 'react'
import {
  Router,
  Route,
  Redirect
} from 'react-router'
import createHashHistory from 'history/createHashHistory'
import LoginView from '@/views/login/login'
import CategoryView from '@/views/category/category'
import SideNavView from '@/views/sideNav/sideNav'

const history = createHashHistory()

class MainRouter extends Component {
  render () {
      return (
        <Router history={history}>
          <div className="app-wrapper">
            <CowRoute exact path="/" component={LoginView}/>
            <CowRoute exact path="/login" component={LoginView}/>
            <CowRoute path="/main/:type" component={SideNavView}/>
            <CowRoute path="/main/category" component={CategoryView}/>
          </div>
        </Router>
      )
    }
}

// 主要route 如果未登录情况则跳转至登录页
const CowRoute = ({ component: Component, ...rest }) => (
  <Route exact {...rest} render={props => (
    true ? (
      <Component {...props}/>
    ) : (
      <Redirect to="/login"/>
    )
  )}/>
)
export default MainRouter
