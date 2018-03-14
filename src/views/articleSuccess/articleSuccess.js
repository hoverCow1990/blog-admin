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
            <Button type="primary" onClick={() => this.goLink('edit')}>继续编辑</Button>
            <Button type="default" onClick={() => this.goLink('list')}>返回列表</Button>
            <Button type="default" onClick={() => this.goLink('article')}>查看文章</Button>
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
  // 跳转地址
  goLink (type) {
    let link
    if (type === 'article') {
      window.open(this.$Constant.URL.devHomePage + 'article/' + this.state.articleId)
      return
    }
    switch (type) {
      case 'edit':
        link = '/main/article?id=' + this.state.articleId
        break
      case 'list':
        link = '/main/articleList'
        break
      default:
        break
    }
    this.props.history.push(link)
  }
}

export default ArticleSuccess
