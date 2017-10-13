import React, { Component } from 'react'
import TagEditor from '@/components/tagEditor/tagEditor'
import {
  Icon,
  Modal,
  Input
} from 'antd'
import CowUpload from '@/components/cowUpload/cowUpload'
import './cowEditor.less'

// 老牛编辑器组件
class CowEditor extends Component {
  constructor () {
    super()
    this.state = {
      uploadProps: {
        name: 'file',
        action: this.$Constant.API.artcle.uploadImg
      },
      perviewerVisible: false, // perviewer弹窗是否可见
      perviewerContext: '', // perviewer弹窗内所有内容转为html格式的value信息
      perviewerVal: { // perviewer弹窗内单个input的
        img: '', // 图
        demoLink: '', // 网站demo的链接
        downLoadLink: '', //下载链接地址
        githubLink: '', // github下载地址
        info: ''  // 前瞻简介
      },
      mainContext: '',
      chapterVisible: false, // 章节弹窗是否显示
      chapterList: [{ // 章节的所有内容列表
        title: '',
        paragraphs: [{  // 每个章节的段落项
          title: '',
          context: ''
        }]
      }],
      activeChapter: 0, // 当前活动的章节信息
      activeParagraph: 0,  // 当前活动的段落信息
      isTagEditorVisiable: false, // 是否tag标签编辑器可见
      tagEditorType: '', // tag标签的类型 比如p 或是 image
      initContextSwitch: false, // 首次加载id!=0后初始化文章的开关
      initInfoSwitch: true
    }
  }
  render () {
    const { perviewerContext, isTagEditorVisiable, tagEditorType, perviewerVisible, chapterVisible, mainContext, perviewerVal, uploadProps } = this.state
    return (
      <div className="cow-editor">
        <div className="article-editTool">
          <div className="article-admin-title"><Icon type="file-text" />文章内容</div>
          <ul className="article-admin-tool">
            <li onClick={() => this.showPerviewerModal()}><Icon type="heart" /><span>前瞻部分</span></li>
            { this.renderChapterLi() }
            <li onClick={() => this.addChapter()}><Icon type="plus-circle" /><span>增加段落</span></li>
          </ul>
        </div>
        <div className="article-main">
          <div className="article-box">
            <div className="article-perviewer" dangerouslySetInnerHTML={{ __html: perviewerContext }} onClick={() => this.showPerviewerModal()}></div>
            <div id="context" className={perviewerContext ? "article-context hasDash" : "article-context"} dangerouslySetInnerHTML={{ __html: mainContext }}></div>
          </div>
        </div>
        <Modal
          title="Add Perviewer"
          visible={perviewerVisible}
          onOk={() => this.handlePerviewerOk()}
          onCancel={() => this.handlePerviewerCancel()}
        >
          <div className="editor-perviewer-model">
            <CowUpload {...uploadProps} success={(res) => this.uploadSuccess(res)}/>
            <Input placeholder="地址链接" size="large" ref="demoLink" value={perviewerVal.demoLink} onChange={(e) => this.setPerviewerVal('demoLink', e)} />
            <Input placeholder="下载地址" size="large" ref="downLoadLink" value={perviewerVal.downLoadLink} onChange={(e) => this.setPerviewerVal('downLoadLink', e)} />
            <Input placeholder="github" size="large" ref="githubLink" value={perviewerVal.githubLink} onChange={(e) => this.setPerviewerVal('githubLink', e)} />
            <Input type="textarea" ref="info" placeholder="文章简述" autosize={{ minRows: 4, maxRows: 6 }} value={perviewerVal.info}  onChange={(e) => this.setPerviewerVal('info', e)}/>
          </div>
        </Modal>
        <Modal
          title="Add Chapter"
          visible={chapterVisible}
          maskClosable={false}
          onOk={() => this.handleChapterOk()}
          onCancel={() => this.handleChapterCancel()}
        >
          { this.renderChapterModel() }
        </Modal>
        <TagEditor type={ tagEditorType } isVisible={ isTagEditorVisiable } hiddenTagEditor={() => this.hiddenTagEditor()} submitTagEditor={data => this.submitTagEditor(data)} />
      </div>
    )
  }
  // 渲染段落一 二的按钮
  renderChapterLi () {
    return this.state.chapterList.map((item, index) => {
      return (
        <li key={index}
          onClick={(e) => this.showChapterModal(e, index)}>
            <span className="delete" onClick={e => this.deleteChapter(e, index)}>
              <img src={require('./images/1.png')} alt="" />
            </span>
            <Icon type="tag" className="icon"/><span>段落{ index + 1}</span>
        </li>
      )
    })
  }
  // 渲染当前的ChapterModel 章节弹窗
  renderChapterModel () {
    let { chapterList, activeChapter } = this.state
    let modelData = chapterList[activeChapter]
    let paragraphDom = modelData.paragraphs.map((item, index) => (
      <li key={index}>
        <div className="item-hd">
          <p onClick={() => this.showTagEditor('title', index)}>{ this.getParaNum(index) + ' : ' + item.title }</p>
          <div className="item-tool">
            <div className="tool-icon"  onClick={() => this.showTagEditor('p', index)}>
              <img src={require('./images/text2.png')} alt="" />
            </div>
            <div className="tool-icon" onClick={() => this.showTagEditor('img', index)}>
              <img src={require('./images/pic.png')} alt="" />
            </div>
            <div className="tool-icon" onClick={() => this.showTagEditor('code', index)}>
              <img src={require('./images/code.png')} alt="" />
            </div>
            <div className="tool-icon" onClick={() => this.showTagEditor('a', index)}>
              <img src={require('./images/link.png')} alt="" />
            </div>
            <div className="tool-icon" onClick={() => this.exchangeParagraph(index, 'up')}>
              <img src={require('./images/up3.png')} alt="" />
            </div>
            <div className="tool-icon" onClick={() => this.exchangeParagraph(index, 'down')}>
              <img src={require('./images/down3.png')} alt="" />
            </div>
            <div className="tool-icon" onClick={() => this.removeParagraph(index)}>
              <img src={require('./images/1.png')} alt="" />
            </div>
          </div>
        </div>
        <div className="item-bd">
          <textarea type="textarea" className="ant-input" value={item.context} onClick={() => this.handlerChangeActiveParagraph(index)} onChange={e => this.handlerParagraphValChange(e, index)} ref={ activeChapter + ' ' + index }/>
        </div>
      </li>
    ))
    return (
      <div className="editor-paragraph-model">
        <div className="paragraph-hd">
          <Input placeholder="标题" size="large" ref="paragraphTitle" value={this.state.chapterList[this.state.activeChapter].title} onChange={e => this.setChapterTitle(e) }/>
          <div className="add" onClick={e => this.addParagraph(e)}><Icon type="plus-circle-o" />增加</div>
        </div>
        <div className="paragraph-wrapper">
          <ul className="paragraph-list">
            { paragraphDom }
          </ul>
        </div>
      </div>
    )
  }
  // 首次加载不为0的文章
  componentWillReceiveProps (nextProps) {
    if (this.state.initContextSwitch) return
    if (nextProps.initContext) {
      let {initContext} = nextProps
      // let perviewerContext = initContext.match(/([\s\S])*?<div class="context-box"/g)
      // let mainContext = initContext.match(/<div class="context-box">[\s\S]*/g)
      let {perviewerContext, context: mainContext} = initContext
      // perviewerContext = perviewerContext ? perviewerContext[0].replace(/<div class="context-box"$/, '') : ''
      // mainContext = mainContext ? mainContext[0] : ''
      this.setState({
        mainContext,
        perviewerContext,
        initContextSwitch: true, // 首次加载后初始化文章的开关
        initInfoSwitch: false
      })
    }
  }
  // 第一次加载已存在的文章(id !== 0)的初始化
  componentDidUpdate () {
    if (this.state.initInfoSwitch) return
    this.initialPerviewer()
    this.initialArtcle()
  }
  // 初始化前瞻部分Input值
  initialPerviewer () {
    let perviewerDom = document.getElementsByClassName('article-perviewer')[0]
    if (perviewerDom.innerHTML) {
      let pImg = perviewerDom.getElementsByTagName('img')[0]
      let pDemo = perviewerDom.getElementsByClassName('watch')[0]
      let pDownload = perviewerDom.getElementsByClassName('download')[0]
      let pGithub = perviewerDom.getElementsByClassName('github')[0]
      let pDes = perviewerDom.getElementsByClassName('des')[0]
      let img = pImg.src
      let demoLink = pDemo.getElementsByTagName('a')[0].href
      let downLoadLink = pDownload.getElementsByTagName('a')[0].href
      let githubLink = pGithub ? pGithub.getElementsByTagName('a')[0].href : ''
      let info = pDes.innerText
      let perviewerVal = {
        img,
        demoLink,
        downLoadLink,
        githubLink,
        info
      }
      this.setState({
        initInfoSwitch: true,
        perviewerVal
      })
    }
  }
  // 初始文章
  initialArtcle () {
    let mainDom = document.getElementsByClassName('context-box')
    let chapterList = []
    Array.from(mainDom).forEach((dom, index) => {
      let hd = dom.children[0]
      let bd = dom.children[1]
      let title = hd.children[0].innerHTML
      let para = bd.children
      let paragraphs = []
      Array.from(para).forEach(par => {
        let item = {
          title: par.children[0].innerHTML.replace(/^\d*\.\d*\s/, ''),
          context: par.children[1].innerHTML
        }
        paragraphs.push(item)
      })
      chapterList.push({
        title,
        paragraphs
      })
    })
    if (chapterList.length === 0) {
      chapterList = [{
        title: '',
        paragraphs: [{
          title: '',
          context: ''
        }]
      }]
    }
    this.setState({
      chapterList,
      initInfoSwitch: true
    })
  }
  // 设置段落标题
  setChapterTitle (e) {
    const val = e.target.value
    let { chapterList, activeChapter } = this.state
    chapterList[activeChapter].title = val
    this.setState({
      chapterList
    })
  }
  // 删除段落
  deleteChapter (e, index) {
    e.stopPropagation()
    let { chapterList } = this.state
    if (chapterList.length === 1) return
    chapterList.splice(index, 1)
    this.setState({
      chapterList,
      activeChapter: 0
    })
    this.handleChapterOk()
  }
  // 显示编辑标签的弹窗
  showTagEditor (tagEditorType, index) {
    this.setState({
      tagEditorType,
      activeParagraph: index,
      isTagEditorVisiable: true
    })
  }
  // 隐藏显示标签的弹窗
  hiddenTagEditor () {
    this.setState({
      isTagEditorVisiable: false
    })
  }
  // 鼠标点击切换焦点段落
  handlerChangeActiveParagraph (index) {
    this.setState({
      activeParagraph: index
    })
  }
  // 处理该激活段落的对应小节的input值改变事件
  handlerParagraphValChange (e, index) {
    let val = e.target.value
    let { chapterList, activeChapter, activeParagraph } = this.state
    let modelData = chapterList[activeChapter]
    let paragraphs = modelData.paragraphs
    paragraphs[activeParagraph].context = val
    this.setState({
      chapterList
    })
  }
  // 标签编辑弹窗点击确定后事件 将获取组件传递而来的value值
  submitTagEditor (data) {
    let { chapterList, activeChapter, activeParagraph } = this.state
    let modelData = chapterList[activeChapter]
    let paragraphs = modelData.paragraphs
    if (data.type === 'title') {
      paragraphs[activeParagraph].title = data.value
      this.setState({
        chapterList
      })
    } else { // p标签 code img
      const input = this.refs[activeChapter + ' ' + activeParagraph]
      const addStart = input.selectionStart
      const lastVal = input.value
      const newVal = lastVal.substring(0, addStart) + data.value + lastVal.substring(addStart)
      paragraphs[activeParagraph].context = newVal
      this.setState({
        chapterList
      })
    }
    this.hiddenTagEditor()
  }
  // 增加一个段落
  addParagraph (e) {
    let { chapterList, activeChapter } = this.state
    let modelData = chapterList[activeChapter]
    let paragraphs = modelData.paragraphs
    paragraphs.push({
      title: '',
      context: ''
    })
    this.setState({
      chapterList,
      activeParagraph: paragraphs.length - 1
    })
  }
  // 增加一个段落
  addChapter () {
    const chapterList = this.state.chapterList
    chapterList.push({ // 章节的所有内容列表
      title: '',
      paragraphs: [{  // 每个章节的段落项
        title: '',
        context: ''
      }]
    })
    this.setState({
      chapterList,
      activeChapter: chapterList.length - 1
    })
  }
  // 删除一个段落
  removeParagraph (index) {
    let { chapterList, activeChapter } = this.state
    let modelData = chapterList[activeChapter]
    let paragraphs = modelData.paragraphs
    if (paragraphs.length === 1) return
    paragraphs.splice(index, 1)
    this.setState({
      chapterList
    })
  }
  // 交换一个段落位置
  exchangeParagraph (index, type) {
    let { chapterList, activeChapter } = this.state
    let modelData = chapterList[activeChapter]
    let paragraphs = modelData.paragraphs
    let changeParagraph = paragraphs[index]
    let beChengeNum = type === 'up' ? index - 1 : index + 1
    let beChengeParagraph = paragraphs[beChengeNum]
    if (!beChengeParagraph) return
    paragraphs[index] = beChengeParagraph
    paragraphs[beChengeNum] = changeParagraph
    this.setState({
      chapterList
    })
  }
  // 显示前瞻弹窗
  showPerviewerModal = () => {
    this.setState({
      perviewerVisible: true
    })
  }
  // 取消前瞻弹窗
  handlePerviewerCancel () {
    this.setState({
      perviewerVisible: false
    })
  }
  // 改变前瞻窗口的input值改变后的值设定
  setPerviewerVal (key, e) {
    let value = e.target.value
    let perviewerVal = Object.assign({}, this.state.perviewerVal, {
      [key]: value
    })
    this.setState({
      perviewerVal
    })
  }
  // 前瞻弹窗确定按钮
  handlePerviewerOk = e => {
    let {img, demoLink, downLoadLink, githubLink, info} = this.state.perviewerVal
    const perviewerContext = this.getPerviewerDom({
      templateImg: img,
      templateDemo: demoLink,
      templateDownload: downLoadLink,
      templateGithub: githubLink,
      templateInfo: info
    }).replace(`<div class="btn github">
            <a href="" target="_blank">
              <i class="iconfont icon-github"></i>Github
            </a>
          </div>`, '')
    this.setState({
      perviewerVisible: false,
      perviewerContext
    })
  }
  // 获取节点类型前瞻节点
  getPerviewerDom (valObj) {
    return this.$Constant.TEMPLATE.perviewer.replace(/\{\{\s.+\s\}\}/g, $0 => {
      return valObj[$0.match(/\w+/g)[0]]
    })
  }
  // 显示章节弹窗
  showChapterModal = (e, index) => {
    const { paragraphTitle } = this.refs
    if (paragraphTitle) {
      paragraphTitle.refs.input.value = this.state.chapterList[index].title
    }
    this.setState({
      chapterVisible: true,
      activeChapter: index
    })
  }
  // 确定章节弹窗
  handleChapterOk () {
    let context = this.state.chapterList.map((chapter, index) =>
      `<div class="context-box">
        <div class="box-hd red">
          <span class="title">${chapter.title}</span>
          <span class="tag">${index}</span>
        </div>
        <div class="box-bd">
          ${
            chapter.paragraphs.map((paragraph, index) => `
              <div class="bd-para">
                <div class="tip">${this.getParaNum(index)} ${paragraph.title}</div>
                <div>${paragraph.context}</div>
              </div>
            `).join('')
          }
        </div>
      </div>`).join('')
    this.setState({
      mainContext: context,
      chapterVisible: false
    })
  }
  // 取消章节弹窗
  handleChapterCancel () {
    this.setState({
      chapterVisible: false
    })
  }
  // 获取章节数
  getParaNum (index) {
    return '' + Math.ceil((index + 1)/ 10) + '.' + index % 10
  }
  // 上传图片成功
  uploadSuccess (res) {
    if (res.statue) {
      let perviewerVal = Object.assign({}, this.state.perviewerVal, {
        img: res.url
      })
      this.setState({
        perviewerVal
      })
    }
  }
}

export default CowEditor;
