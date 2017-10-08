import React, { Component } from 'react'
import CowSelectBox from '@/components/cowSelectBox/cowSelectBox'
import CowEditor from '@/components/cowEditor/cowEditor'
import CowUpload from '@/components/cowUpload/cowUpload'
import {
  Icon,
  Button,
  Input,
  message,
  Select
} from 'antd'
import './article.less'

const Option = Select.Option

class Article extends Component {
  constructor () {
    super()
    this.state = {
      articleId: 0, // 0为新增文章 其他为旧文章用来修改的
      categoryList: [],
      articleInner: {
        title: '',
        weight: 0,
        mainType: '',
        keyWords: '',
        description: '',
        smallPerviewer: '',
        secondType: []
      },
      uploadProps: {
        name: 'file',
        action: this.$Constant.API.artcle.uploadImg
      },
      initContext: ''
    }
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
                  <Input placeholder="文章标题" value={this.state.articleInner.title} ref="title" onChange={(e) => this.handlerInputVal(e, 'title')}/>
                </div>
              </li>
              <li>
                <span className="tag">关键词</span>
                <div className="list-context">
                  <Input placeholder="关键词用于被搜索两两之间用;分割"  value={this.state.articleInner.keyWords} ref="keyWords" onChange={(e) => this.handlerInputVal(e, 'keyWords')}/>
                </div>
              </li>
              <li>
                <span className="tag">主栏目</span>
                <div className="list-context">
                  <Select placeholder="文章的主要栏目" value={this.state.articleInner.mainType} onChange={value => this.setArticleInner('mainType', value)}>
                    { renderMainTypeOptions }
                  </Select>
                </div>
              </li>
              <li>
                <span className="tag">权重数</span>
                <div className="list-context">
                  <Input placeholder="数字越高排名越前"  value={this.state.articleInner.weight} ref="weight" onChange={(e) => this.handlerInputVal(e, 'weight')} />
                </div>
              </li>
              <li className="maxWidth">
                <span className="tag">副栏目</span>
                <div className="list-context">
                  <CowSelectBox  value={this.state.articleInner.secondType} categoryList={categoryList} onChangeSelect={(val, id) => this.handlerTypeSelect(val, id)}/>
                </div>
              </li>
              <li className="maxWidth pic">
                <span className="tag">缩略图</span>
                <div className="list-context">
                  <CowUpload {...uploadProps} success={(res) => this.uploadSuccess(res)}/>
                </div>
              </li>
              <li className="maxWidth maxHeight pic">
                <span className="tag">概要</span>
                <div className="list-context">
                  <textarea type="textarea" placeholder="文章概要" className="ant-input" ref="description" value={this.state.articleInner.description} style={{height: '46px', minHeight: '46px', maxHeight: '118px'}} onChange={(e) => this.handlerInputVal(e, 'description')}></textarea>
                </div>
              </li>
            </ul>
          </div>
          <CowEditor ref="cowEditor" initContext={this.state.initContext}/>
        </div>
      </div>
    )
  }
  // 渲染可选的主要类别
  renderMainTypeOptions () {
    return this.state.categoryList.map(item => (
      <Option key={item.id} value={'' + item.id}>{item.title}</Option>
    ))
  }
  componentWillMount () {
    this.requestCategoryList()
  }
  // 请求所有类别
  requestCategoryList () {
    this.$Http({
      url: this.$Constant.API.category.getList,
      method: 'GET'
    }).then(res => {
      const search = this.props.history.location.search
      const id = search.match(/=(\d+)$/)[1]
      this.setState({
        categoryList: res
      })
      this.initialState(id) // 请求文章
    })
  }
  // 如果是0则是新增文章 不为0则发送请求该id文章的信息
  initialState (id) {
    this.setState({
      articleId: id
    })
    if (id !== "0") {
      this.requestArticleInfo(id)
    }
  }
  // 请求已有的文章信息
  requestArticleInfo (id) {
    this.$Http({
      url: this.$Constant.API.artcle.getArtcle,
      method: 'GET',
      params: {
        id
      }
    }).then(res => {
      this.initialArtcle(res)
    })
  }
  // 查询旧文章后的初始化
  initialArtcle (res) {
    let {title, weight, mainType, keyWords, description, smallPerviewer, secondType, context} = res
    secondType = secondType.split(',').map(item => Number(item))
    mainType = this.state.categoryList.find(item => item.id === mainType).title
    this.setState({
      articleInner: {
        title,
        weight,
        mainType,
        keyWords,
        description,
        smallPerviewer,
        secondType
      },
      initContext: context
    })
  }
  // 处理input键入后改变值
  handlerInputVal (e, key) {
    let value = e.target.value
    this.setArticleInner(key, value)
  }
  // 组件内副栏目栏的select选择
  handlerTypeSelect (secondType) {
    this.setArticleInner('secondType', secondType)
  }
  // 图片上传成功后的回调
  uploadSuccess (res) {
    if (res.statue) {
      this.setArticleInner('smallPerviewer', res.url) // 缩列图的地址
      message.success('缩略图上传成功')
    } else {
      message.error('缩略图上传失败')
    }
  }
  // 更新articleInner的内容
  setArticleInner (key, val) {
    let articleInner = Object.assign({}, this.state.articleInner, {
      [key]: val
    })
    this.setState({
      articleInner
    })
  }
  // 上传文章
  updataArticle () {
    const search = this.props.history.location.search
    const id = search.match(/=(\d+)$/)[1]
    const {articleInner} = this.state
    let cowEditorState = this.refs.cowEditor.state
    let perviewer = cowEditorState.perviewerContext && id === '0' ? '<div class="article-perviewer">' + cowEditorState.perviewerContext + '</div>' : cowEditorState.perviewerContext
    // let mainContext = id === '0' ? '<div id="context" class="article-context hasDash">' + cowEditorState.mainContext + '</div>' : cowEditorState.mainContext
    let mainContext = cowEditorState.mainContext
    let context = perviewer + mainContext
    let isCanSubmit = this.validateVal(articleInner)
    let articleInnerData = Object.assign({}, articleInner, {
      mainType: Number.isNaN(Number(articleInner.mainType)) ? this.state.categoryList.find(item => item.title === articleInner.mainType).id : articleInner.mainType
    })
    if (isCanSubmit.statue) {
      this.$Http({
        url: this.$Constant.API.artcle.upLoadArticle,
        method: 'POST',
        data: {
          id,
          articleInner: articleInnerData,
          context: context.replace(/("|')/g, ($0, $1) => "\\" + $1)
        }
      }).then(res => {
         message.success('文章提交成功')
      })
    } else {
      message.error(isCanSubmit.msg)
    }
  }
  // 验证是否可以提交
  validateVal (articleInner) {
    let {description, mainType, secondType, title, smallPerviewer} = articleInner
    if (!title) {
      return {
        statue: false,
        msg: '标题不能为空'
      }
    } else if (!mainType) {
      return {
        statue: false,
        msg: '主栏目不能为空'
      }
    } else if (!secondType.length) {
      return {
        statue: false,
        msg: '请选择副栏目'
      }
    } else if (!smallPerviewer) {
      return {
        statue: false,
        msg: '请上传缩略图'
      }
    } else if (!description) {
      return {
        statue: false,
        msg: '概要不能为空'
      }
    } else {
      return {
        statue: true
      }
    }
  }
}

export default Article
