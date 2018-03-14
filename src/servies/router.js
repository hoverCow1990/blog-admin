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
import ArticleListView from '@/views/articleList/articleList'
import ArticleView from '@/views/article/article'
import ArticleSuccessView from '@/views/articleSuccess/articleSuccess'
import NoticesBoard from '@/views/noticesBoard/noticesBoard'
import MessageArticle from '@/views/messageArticle/messageArticle'
import Dbs from '@/views/dbs/dbs'
import Member from '@/views/member/member'

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
            <CowRoute path="/main/articleList"  component={ArticleListView}/>
            <CowRoute path="/main/article"  component={ArticleView}/>
            <CowRoute path="/main/articleSuccess"  component={ArticleSuccessView}/>
            <CowRoute path="/main/noticesBoard"  component={NoticesBoard}/>
            <CowRoute path="/main/messageArticle"  component={MessageArticle}/>
            <CowRoute path="/main/dbs"  component={Dbs}/>
            <CowRoute path="/main/member"  component={Member}/>
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
