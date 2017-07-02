import React, { Component } from 'react'
import {
  Icon,
  Button,
  Modal,
  Input,
  Select,
  Pagination
} from 'antd'
import './articleList.less'

const Search = Input.Search
const Option = Select.Option
const confirm = Modal.confirm

class ArticleList extends Component {
  constructor () {
    super()
    this.state = {
      alertVisible: false, // 弹窗显示隐藏
      isSubmitLoding: false, // 是否提交表单
      allArticleLength: 100,
      defaultPageSize: 10,
      articleList: [{
        title: '联和利华天猫首页3稿',
        time: '2016-11-15 02:32:00',
        id: '123',
        watch: 12,
        message: 2
      }, {
        title: '纯hover流推广页面',
        time: '2016-11-15 02:32:00',
        id: '5',
        watch: 12,
        message: 12
      }, {
        title: '明星翻转盒子',
        time: '2016-11-15 02:32:00',
        id: '221',
        watch: 12,
        message: 5
      }, {
        title: '3D 翻转式轮播体',
        time: '2016-11-15 02:32:00',
        id: '12',
        watch: 12,
        message: 0
      }, {
        title: '3D 螺旋体翻转',
        time: '2016-11-15 03:32:00',
        id: '3',
        watch: 12,
        message: 0
      }, {
        title: '联和利华天猫首页3稿',
        time: '2016-11-15 02:32:00',
        id: '1',
        watch: 12,
        message: 2
      }, {
        title: '纯hover流推广页面',
        time: '2016-11-15 02:32:00',
        id: '15',
        watch: 12,
        message: 12
      }, {
        title: '明星翻转盒子',
        time: '2016-11-15 02:32:00',
        id: '21',
        watch: 12,
        message: 5
      }, {
        title: '3D 翻转式轮播体',
        time: '2016-11-15 02:32:00',
        id: '33',
        watch: 12,
        message: 0
      }, {
        title: '3D 螺旋体翻转',
        time: '2016-11-15 03:32:00',
        id: '113',
        watch: 12,
        message: 0
      }]
    }
  }
  componentWillMount () {
    this.setDefaultPageSize()
  }
  render () {
    const { handleTypeChange, handerSearch} = this
    let { allArticleLength, defaultPageSize } = this.state
    let articleList = this.renderArticleList()
    return (
      <div className="artcleList admin-container">
        <div className="category-title admin-title">
          <p><Icon type="file-text" />所有文章列表</p>
          <div className="btn-group">
            <Button type="primary" onClick={() => this.linkToArticle(0)}><Icon type="plus-circle-o" />新增文章</Button>
          </div>
        </div>
        <div className="artcleList-bd">
          <div className="artcleList-topBar">
            <div className="topBar-container">
              <Search
                placeholder="搜索"
                style={{ width: 200 }}
                onSearch={val => handerSearch(val)}
              />
              <Select defaultValue="0" style={{ width: 120 }} onChange={handleTypeChange}>
                <Option value="0">All</Option>
                <Option value="1">javascript</Option>
                <Option value="2">html</Option>
                <Option value="3">node/java</Option>
                <Option value="4">others</Option>
              </Select>
            </div>
          </div>
          <div className="artcleList-main">
            <div className="main-hd">
              <div className="hd-id">Id</div>
              <div className="hd-title">标题</div>
              <div className="hd-update">更新时间</div>
              <div className="hd-watch">点击</div>
              <div className="hd-message">评论</div>
              <div className="hd-control">操作</div>
            </div>
            <ul className="article-list">
              {articleList}
            </ul>
          </div>
          <div className="artcleList-pagination">
            <Pagination defaultCurrent={1} total={allArticleLength} defaultPageSize={defaultPageSize} onChange={index => this.handlerPageChange(index)}/>
          </div>
        </div>
      </div>
    )
  }
  // 根据页面高度设置显示的每页的条数
  setDefaultPageSize () {
    const docHeight = window.document.documentElement.offsetHeight
    const leftHeight = docHeight - 270
    this.setState({
      defaultPageSize: Math.ceil(leftHeight / 39) - 1
    })
  }
  // 渲染文章列表
  renderArticleList () {
    const articleList = this.state.articleList
    return articleList.map(item => (
      <li key={item.id}>
        <div className="article-id">{item.id}</div>
        <div className="article-title">{item.title}</div>
        <div className="article-update">{item.time}</div>
        <div className="article-watch">{item.watch}</div>
        <div className="article-message">{item.message}</div>
        <div className="article-control"><Icon type="edit" onClick={() => this.linkToArticle(item.id)} /><Icon type="paper-clip" /><Icon type="close-circle" onClick={() => this.deleteArticle(item.title)}/></div>
      </li>
    ))
  }
  // 删除文章
  deleteArticle (title) {
    confirm({
      title: '确定要删除该文章吗?',
      content: `${title}删除后操作不可恢复`,
      iconType: 'info-circle',
      onOk() {
        // return new Promise((resolve, reject) => {
        //   setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        // }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {},
    })
  }
  // 链接至文章页面
  linkToArticle (id) {
    let location = {
      pathname: '/main/article',
      search: `?id=${id}`
    }
    this.props.history.push(location)
  }
  // 显示alert
  showAlert () {
    this.setState({
      alertVisible: true
    })
  }
  // 隐藏alert
  hidenAlert () {
    this.setState({
      alertVisible: false
    })
  }
  // 切换选择类型
  handleTypeChange (type) {
    console.log(type)
  }
  // 搜索对应type的文章
  handerSearch (val) {
    console.log(val)
  }
  // 切换页面
  handlerPageChange (index) {
    console.log(index, this)
  }
}

export default ArticleList
