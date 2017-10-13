import React, { Component } from 'react'
import {
  Button
} from 'antd'
import './articleSuccess.less'

class ArticleSuccess extends Component {
  constructor () {
    super()
    this.state = {
      articleId: ''
    }
  }
  render () {
    return (
      <div className="articleSuccess admin-container">
        <div className="articleSuccess-box">
          <img className="feature" src={require('./images/timg.png')} alt="" />
          <div className="btn-group">
            <Button type="primary" onClick={() => this.linkToEditor()}>继续编辑</Button>
            <Button type="default" >查看文章</Button>
          </div>
        </div>
      </div>
    )
  }
  componentWillMount () {
    this.initialLink()
  }
  // 初始化链接的地址
  initialLink () {
    let id = this.props.history.location.search.match(/\?id=(\d+)$/)[1]
    this.setState({
      articleId: id
    })
  }
  linkToEditor () {
    let link = '/main/article?id=' + this.state.articleId
    this.props.history.push(link)
  }
}

export default ArticleSuccess
