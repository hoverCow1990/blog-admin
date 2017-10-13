import React, { Component } from 'react'
import {
  Icon,
  Button,
  Modal,
  Input,
  Select,
  Pagination,
  message
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
      allArticleLength: 0,  // 所有文章的个数
      defaultPageSize: 10, // 每页展示的条数
      nowArticleType: '0',  // 目前显示的文章类型
      nowPageIndex: 0,  // 目前显示文章分页的页数
      articleList: [],
      searchVal: ''
    }
  }
  componentWillMount () {
    this.requestArticleList(0, '0') // 第一个为第几页开始 第二个为type
    // this.setDefaultPageSize()
  }
  render () {
    let { allArticleLength, defaultPageSize, searchVal, nowPageIndex } = this.state
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
                value={searchVal}
                onChange={e => this.handlerSearchVal(e)}
                onSearch={val => this.handerSearch()}
              />
              <Select defaultValue="0" style={{ width: 120 }} onChange={type => this.handleTypeChange(type)}>
                <Option value="0">all</Option>
                <Option value="1">javascript</Option>
                <Option value="2">html/css</Option>
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
            <Pagination defaultCurrent={1} total={allArticleLength} current={nowPageIndex + 1} defaultPageSize={defaultPageSize} onChange={index => this.handlerPageChange(index - 1)}/>
          </div>
        </div>
      </div>
    )
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
        <div className="article-control">
          <div className="control-btn" onClick={() => this.linkToArticle(item.id)}>
            <img src={require("./images/3.png")} alt="" />
          </div>
          <div className="control-btn" onClick={() => this.linkToView(item.id)}>
            <img src={require("./images/5.png")}  alt="" />
          </div>
          <div className="control-btn" onClick={() => this.deleteArticle(item.title, item.id)}>
            <img src={require("./images/1.png")}  alt="" />
          </div>
        </div>
      </li>
    ))
  }
  // 请求文章列表
  requestArticleList (st, type) {
    let end = this.state.defaultPageSize
    this.$Http({
      url: this.$Constant.API.artcle.getArticleList,
      method: 'GET',
      params: {
        st,
        end,
        type
      }
    }).then(res => {
      this.setArticleList(res)
    })
  }
  // 设置文章列表
  setArticleList (res) {
    let articleList = res.articleList.map(item => {
      return {
        id: item.id,
        title: item.title,
        message: this.$Lib.transMsgLength(item.message),
        watch: item.watch,
        time: this.$Lib.transTime(item.time)
      }
    })
    this.setState({
      articleList,
      allArticleLength: res.allLength
    })
  }
  // 根据页面高度设置显示的每页的条数
  setDefaultPageSize () {
    const docHeight = window.document.documentElement.offsetHeight
    const leftHeight = docHeight - 270
    this.setState({
      defaultPageSize: Math.ceil(leftHeight / 39) - 1
    })
  }
  // 删除文章
  deleteArticle (title, id) {
    let _self = this
    let st = this.state.nowPageIndex * this.state.defaultPageSize
    let end = this.state.defaultPageSize
    let nowArticleType = this.state.nowArticleType
    confirm({
      title: '确定要删除该文章吗?',
      content: `${title}删除后操作不可恢复`,
      iconType: 'info-circle',
      onOk() {
        _self.$Http({
          url: _self.$Constant.API.artcle.deleteArticle,
          method: 'POST',
          data: {
            id,
            st,
            end,
            type: nowArticleType
          }
        }).then(res => {
          if (res.statue) {
            _self.setArticleList(res)
            message.success('文章删除成功')
          }
        })
      },
      onCancel() {},
    })
  }
  handlerSearchVal (e) {
    let value = e.target.value
    this.setState({
      searchVal: value
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
    if (this.state.nowArticleType === type) return
    this.setState({
      nowArticleType: type,
      nowPageIndex: 0,
      searchVal: ''
    })
    this.requestArticleList(0, type)
  }
  // 搜索对应type的文章
  handerSearch (st = 0) {
    let {nowArticleType, defaultPageSize, searchVal} = this.state
    this.$Http({
      url: this.$Constant.API.artcle.searchArtcleList,
      params: {
        st,
        end: defaultPageSize,
        keyWords: searchVal,
        type: this.state.nowArticleType
      }
    }).then(res => {
      this.setArticleList(res)
    })
  }
  // 切换页面
  handlerPageChange (index) {
    let { searchVal, nowArticleType } = this.state
    this.setState({
      nowPageIndex: index
    })
    if (searchVal) {
      this.handerSearch(index)
    } else {
      this.requestArticleList(index * this.state.defaultPageSize, nowArticleType)
    }
  }
  linkToView () {
    window.location.href = ''
  }
}

export default ArticleList
