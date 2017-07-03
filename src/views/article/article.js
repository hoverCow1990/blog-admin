import React, { Component } from 'react'
import CowSelectBox from '@/components/cowSelectBox/cowSelectBox'
import CowEditor from '@/components/cowEditor/cowEditor'
import {
  Icon,
  Button,
  Modal,
  Input,
  message,
  Select,
  Upload
} from 'antd'
import './article.less'

const Option = Select.Option

class Article extends Component {
  constructor () {
    super()
    this.state = {
      articleId: 0, // 0为新增文章 其他为旧文章用来修改的
      categoryList: [{
          title: 'javascript',
          id: 1,
          childrens: [{
              title: 'vue',
              id: 2
            }, {
              title: 'angular',
              id: 3
            }, {
              title: 'react',
              id: 4
            }, {
              title: 'backbone',
              id: 5
            }, {
              title: 'es6',
              id: 6
            }, {
              title: 'jquery',
              id: 7
            }, {
              title: 'backbone',
              id: 8
            }]
      }, {
          title: 'html',
          id: 9,
          childrens: [{
              title: 'html',
              id: 10
            }, {
              title: 'less',
              id: 11
            }, {
              title: 'sass',
              id: 12
            }, {
              title: 'BootsTrip',
              id: 23
            }]
      }, {
          title: 'node/java',
          id: 13,
          childrens: [{
              title: 'http',
              id: 14
            }, {
              title: 'node',
              id: 15
            }, {
              title: 'java',
              id: 16
            }, {
              title: 'php',
              id: 18
            }]
      }, {
          title: 'others',
          id: 19,
          childrens: [{
              title: 'photoshop',
              id: 20
            }, {
              title: 'dede',
              id: 21
            }, {
              title: 'tool',
              id: 22
            }]
      }],
      articleInner: {
        title: '',
        weight: 0,
        mainType: '',
        secondType: []
      },
      uploadProps: {
        name: 'file',
        action: '//jsonplaceholder.typicode.com/posts/',
        headers: {
          authorization: 'authorization-text',
        }
      }
    }
  }
  componentWillMount () {
    const search = this.props.history.location.search
    const id = search.match(/\=(\d+)$/)[1]
    this.initialState(id)
  }
  render () {
    let renderMainTypeOptions = this.renderMainTypeOptions()
    const { categoryList, uploadProps } = this.state
    return (
      <div className="article admin-container">
        <div className="article-title admin-title">
          <p><Icon type="edit" />网站文章编辑</p>
          <div className="btn-group">
            <Button type="primary" onClick={() => this.updataArticle()}><Icon type="api" />发布</Button>
          </div>
        </div>
        <div className="article-bd">
          <div className="article-inner">
            <ul className="inner-list">
              <li>
                <span className="tag">标题</span>
                <div className="list-context">
                  <Input placeholder="文章标题" />
                </div>
              </li>
              <li>
                <span className="tag">关键词</span>
                <div className="list-context">
                  <Input placeholder="关键词用于被搜索" />
                </div>
              </li>
              <li>
                <span className="tag">主栏目</span>
                <div className="list-context">
                  <Select placeholder="文章的主要栏目">
                    { renderMainTypeOptions }
                  </Select>
                </div>
              </li>
              <li>
                <span className="tag">权重数</span>
                <div className="list-context">
                  <Input placeholder="数字越高排名越前" />
                </div>
              </li>
              <li className="maxWidth">
                <span className="tag">副栏目</span>
                <div className="list-context">
                  <CowSelectBox categoryList={categoryList} onChangeSelect={(val, id) => this.handlerTypeSelect(val, id)}/>
                </div>
              </li>
              <li className="maxWidth pic">
                <span className="tag">缩略图</span>
                <div className="list-context">
                  <Upload {...uploadProps}>
                    <Button>
                      <Icon type="upload" /> Click to Upload
                    </Button>
                  </Upload>
                </div>
              </li>
              <li className="maxWidth maxHeight pic">
                <span className="tag">概要</span>
                <div className="list-context">
                  <Input type="textarea" placeholder="文章概要" autosize={{ minRows: 2, maxRows: 6 }} />
                </div>
              </li>
            </ul>
          </div>
          <CowEditor />
        </div>
      </div>
    )
  }
  // 如果是0则是新增文章 不为0则发送请求该id文章的信息
  initialState (id) {
    if (id === 0) {
      this.setState({
        articleId: id
      })
    } else {
      this.requestArticleInfo(id)
    }
  }
  // 渲染可选的主要类别
  renderMainTypeOptions () {
    return this.state.categoryList.map(item => (
      <Option key={item.id} value={'' + item.id}>{item.title}</Option>
    ))
  }
  // 组件内副栏目栏的select选择
  handlerTypeSelect (secondType) {
    this.setArticleInner('secondType', secondType)
  }
  // 更新articleInner的内容
  setArticleInner (key, val) {
    let articleInner = Object.assign({}, this.state.articleInner, {
      key: val
    })
    this.setState({
      articleInner
    })
  }
  requestArticleInfo (id) {

  }
  // 上传文章
  updataArticle () {

  }
}

export default Article
