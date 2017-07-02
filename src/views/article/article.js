import React, { Component } from 'react'
import CowSelectBox from '@/components/cowSelectBox/cowSelectBox'
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
          <div className="article-context article">
            <div className="article-admin-title"><Icon type="file-text" />文章内容</div>
            <ul className="article-admin-tool">
              <li><Icon type="heart" /><span>前瞻部分</span></li><li><Icon type="tag" /><span>段落</span></li>
            </ul>
            <div className="article-main">
              <ul className="cow-topLine">
                <li></li><li></li><li></li><li></li>
              </ul>
              <div className="article-topBar">
                <p>
                  <span>博客正文</span>
                </p>
              </div>
                <div className="article-box">
                  <div className="article-hd"><h1 className="title">React与Redux实现后台管理系统</h1> <div className="info"><ul className="base"><li>作者: 老实的牛</li> <li>时间: 2017-06-17 02:45:32</li> <li>观看: 121</li> <li>点赞: 21</li></ul> <ul className="link">
              当前位置 :
              <a href="#/articleList/html" className="">html</a></ul></div></div> <div className="article-perviewer">
              <div className="perviewer">
                <img src="http://www.web-jackiee.com/uploads/allimg/170313/1-1F313043542922.jpg" />
              </div>
              <div className="des">
                <p>在用react与redux做了一个简单的todoMvc后,用动脑的Api自己实现的的一个MVC层前后端分离的后台管理系统</p>
                <p>一个用react制作的后台git系统,可以clone在GitHub上的项目,在本地云盘发布,并且实现github上pull,checkout -hard等操作!云盘内制作了增 删 重命名 复制黏贴 新建文件夹的功能!</p>
              </div>
              <div className="btn-group">
                <div className="btn download">
                  <i className="iconfont icon-xiazai"></i>下载源码
                </div>
                <div className="btn watch">
                  <i className="iconfont icon-yanjing"></i>在线演示
                </div>
                <div className="btn github">
                  <i className="iconfont icon-github"></i>Github
                </div>
              </div></div></div> <div id="context" className="article-context">
            <div className="context-box">
              <div className="box-hd red">
                <span className="title">项目简介</span>
                <span className="tag">1</span>
              </div>
              <div className="box-bd">
                <div className="bd-para">
                  <div className="tip">1.1 项目类型</div>
                  <p>纯前后端分离 Git项目clone至本地云盘操作系统</p>
                </div>
                <div className="bd-para">
                  <div className="tip">1.2 运用技术</div>
                  <p>一个用react制作的后台git系统,可以clone在GitHub上的项目,在本地云盘发布,并且实现github上pull,checkout -hard等操作!云盘内制作了增 删 重命名 复制黏贴 新建文件夹的功能!</p>
                  <img src="http://www.web-jackiee.com/uploads/allimg/170312/1-1F31219213T94.jpg" />
                </div>
                <div className="bd-para">
                  <div className="tip">1.3 开发背景</div>
                  <p>1：开发时间 :  6.5天 [ 其中包括学习了Echarts的简单运用 ]</p>
                  <p>2：开发背景： 为了进一步熟悉redux与react之间的交互</p>
                  链接地址:<a href="#">https://vuejs.org/v2/guide/list.html#key</a>
                </div>
              </div>
            </div>
            <div className="context-box">
              <div className="box-hd orange">
                <span className="title">项目特色</span>
                <span className="tag">1</span>
              </div>
              <div className="box-bd">
                <div className="bd-para">
                  <div className="tip">2.1 项目类型</div>
                  <p>纯前后端分离 Git项目clone至本地云盘操作系统</p>
                </div>
                <div className="bd-para">
                  <div className="tip">2.2 运用技术</div>
                  <p>1：运用定时cookie实现记住我功能,在config文件内可以直接改变cookie保存时间去掉勾选后直接清除cookie记录</p>
                  <img src="http://www.web-jackiee.com/uploads/test/2.jpg" />
                </div>
                <div className="bd-para">
                  <div className="tip">2.3 开发背景</div>
                  <p>1：开发时间 :  6.5天 [ 其中包括学习了Echarts的简单运用 ]</p>
                  <p>2：开发背景： 为了进一步熟悉redux与react之间的交互</p>
                  <img src="http://www.web-jackiee.com/uploads/test/3.jpg" />
                  <div className="cow-code">
                    <ul>
                      <li>
                        <div className="count">01</div>
                        <div className="content">
                          <code className="grey">// 用于远程服务器是否登录的验证,如果没有登录则跳转至登录页面,并提示优先登录</code>
                        </div>
                      </li>
                      <li>
                        <div className="count">02</div>
                        <div className="content">
                          <code className="white">export </code>
                          <code className="blue">const </code>
                          <code className="white">cookieMiddleware </code>
                          <code className="red">= </code>
                          <code className="white">dispatch </code>
                          <code className="red">=</code>
                          <code className="red">&gt; </code>
                          <code className="white">res </code>
                          <code className="red">=</code>
                          <code className="red">&gt; </code>
                        </div>
                      </li>
                      <li>
                        <div className="count">03</div>
                        <div className="content">
                          <code>&nbsp;&nbsp;&nbsp;&nbsp;</code>
                          <code className="white">res </code>
                          <code className="red">= </code>
                          <code className="white">res</code>
                          <code className="white">.</code>
                          <code className="white">body</code>
                          <code className="white">;</code>
                        </div>
                      </li>
                      <li>
                        <div className="count">04</div>
                        <div className="content">
                          <code className="spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code>
                          <code className="red">return </code>
                          <code className="red">new </code>
                          <code className="white">Promise</code>
                          <code className="white">(</code>
                          <code className="white">(</code>
                          <code className="white">solve</code>
                          <code className="white">,</code>
                          <code className="white">reject</code>
                          <code className="white">) </code>
                          <code className="red">=</code>
                          <code className="red">&gt; </code>
                        </div>
                      </li>
                      <li>
                        <div className="count">05</div>
                        <div className="content">
                          <code className="spaces">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code>
                          <code className="red">if</code>
                          <code className="white">(</code>
                          <code className="white">res</code>
                          <code className="white">.</code>
                          <code className="white">hasOwnProperty</code>
                          <code className="white">(</code>
                          <code className="yellow">"noLogin"</code>
                          <code className="white">)</code>
                          <code className="red">&amp;</code>
                          <code className="red">&amp;</code>
                          <code className="white">res</code>
                          <code className="white">.</code>
                          <code className="white">noLogin</code>
                          <code className="white">)</code>
                        </div>
                      </li>
                      <li>
                        <div className="count">06</div>
                        <div className="content">
                          <code className="spaces">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code>
                          <code className="white">dispatch</code>
                          <code className="white">(</code>
                          <code className="white">doLink</code>
                          <code className="white">(</code>
                          <code className="yellow">'login'</code>
                          <code className="white">)</code>
                          <code className="white">);&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code>
                          <code className="grey">// 处理侧导航高亮store</code>
                        </div>
                      </li>
                      <li>
                        <div className="count">07</div>
                        <div className="content">
                          <code className="spaces">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code>
                          <code className="white">dispatch</code>
                          <code className="white">(</code>
                          <code className="white">doLogoutData</code>
                          <code className="white">(</code>
                          <code className="white">)</code>
                          <code className="white">)</code>
                        </div>
                      </li>
                      <li>
                        <div className="count">08</div>
                        <div className="content">
                          <code className="spaces">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code>
                          <code className="white">hashHistory</code>
                          <code className="white">.</code>
                          <code className="blue">push</code>
                          <code className="white">(</code>
                          <code className="yellow">'login'</code>
                          <code className="white">)</code>
                          <code className="white">;</code>
                        </div>
                      </li>
                      <li>
                        <div className="count">09</div>
                        <div className="content">
                          <code className="white">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code>
                          <code className="red">return</code>
                          <code className="white">;</code>
                        </div>
                      </li>
                      <li>
                        <div className="count">10</div>
                        <div className="content">
                          <code className="spaces">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code>
                        </div>
                      </li>
                      <li>
                        <div className="count">11</div>
                        <div className="content">
                          <code className="white">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;solve(res);</code>
                        </div>
                      </li>
                      <li>
                        <div className="count">12</div>
                        <div className="content">
                          <code className="white">&nbsp;&nbsp;&nbsp;&nbsp;})</code>
                        </div>
                      </li>
                      <li>
                        <div className="count">13</div>
                        <div className="content">
                        </div>
                      </li>
                    </ul>
                  </div>
                  链接地址:<a href="#">https://vuejs.org/v2/guide/list.html#key</a>
                </div>
              </div>
            </div></div>  </div>
          </div>
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
