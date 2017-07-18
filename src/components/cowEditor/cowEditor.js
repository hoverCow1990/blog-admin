import React, { Component } from 'react'
import $Constant from '@/config/constant'
import TagEditor from '@/components/tagEditor/tagEditor'
import {
  Icon,
  Modal,
  Input,
  message,
  Upload,
  Button
} from 'antd'
import './cowEditor.less'

// 老牛编辑器组件
class CowEditor extends Component {
  constructor () {
    super()
    this.state = {
      preViewUploadProps: { // preView部分的上传图片
        name: 'file',
        action: '//jsonplaceholder.typicode.com/posts/',
        headers: {  //请求头
           authorization: 'authorization-text'
        },
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        }
      },
      perviewerVisible: false, // perviewer弹窗是否可见
      perviewerContext: '', // perviewer弹窗内所有内容转为html格式的value信息
      perviewerVal: { // perviewer弹窗内单个input的
        img: '', // 图
        demoLink: '', // 网站demo的链接
        downLoadLink: '', //下载链接地址
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
      tagEditorType: '' // tag标签的类型 比如p 或是 image
    }
  }
  render () {
    const { preViewUploadProps, perviewerContext, isTagEditorVisiable, tagEditorType, perviewerVisible, chapterVisible, mainContext } = this.state
    return (
      <div className="cow-editor">
        <div className="article-context">
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
            <div id="context" className="article-context" dangerouslySetInnerHTML={{ __html: mainContext }}></div>
          </div>
        </div>
        <Modal
          title="Add Perviewer"
          visible={perviewerVisible}
          onOk={() => this.handlePerviewerOk()}
          onCancel={() => this.handlePerviewerCancel()}
        >
          <div className="editor-perviewer-model">
            <Upload
              name='file'
              action='//jsonplaceholder.typicode.com/posts/'
              headers={{  //请求头
                 authorization: 'authorization-text'
              }}>
              <Button>
                <Icon type="upload" /> 上传前瞻图
              </Button>
            </Upload>
            <Input placeholder="地址链接" size="large" ref="demoLink"/>
            <Input placeholder="下载地址" size="large" ref="downLoadLink"/>
            <Input placeholder="github" size="large" ref="githubLink"/>
            <Input type="textarea" ref="info" placeholder="文章简述" autosize={{ minRows: 4, maxRows: 6 }} />
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
  renderChapterLi () {
    return this.state.chapterList.map((item, index) => {
      return (
        <li key={index}
          onClick={(e) => this.showChapterModal(e, index)}>
            <span className="delete" onClick={e => this.deleteChapter(e, index)}><Icon type="plus-square" /></span>
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
          <p onClick={() => this.showTagEditor('title', index)}>{ '' + Math.ceil((index + 1)/ 10) + '.' + index % 10 + ' ' + item.title}</p>
          <div className="item-tool">
            <Icon type="copy" onClick={() => this.showTagEditor('p', index)}/>
            <Icon type="picture" onClick={() => this.showTagEditor('img', index)}/>
            <Icon type="code-o" onClick={() => this.showTagEditor('code', index)}/>
            <Icon type="link" />
            <Icon type="up-circle" onClick={() => this.exchangeParagraph(index, 'up')}/>
            <Icon type="down-circle" onClick={() => this.exchangeParagraph(index, 'down')}/>
            <Icon type="close-circle" onClick={() => this.removeParagraph(index)}/>
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
          <Input placeholder="标题" size="large" ref="paragraphTitle" onChange={e => this.setChapterTitle(e) }/>
          <div><Icon type="plus-square" onClick={() => this.addParagraph()}/></div>
        </div>
        <div className="paragraph-wrapper">
          <ul className="paragraph-list">
            { paragraphDom }
          </ul>
        </div>
      </div>
    )
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
    if (e.target.class === 'delete') return
    let { chapterList, activeChapter } = this.state
    let modelData = chapterList[activeChapter]
    let paragraphs = modelData.paragraphs
    paragraphs.push({
      title: '',
      context: '' + Math.random()
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
  // 前瞻弹窗确定按钮
  handlePerviewerOk = e => {
    const templateImg = 'http://www.web-jackiee.com/uploads/allimg/170313/1-1F313043542922.jpg'
    const templateDemo = this.refs.demoLink.refs.input.value
    const templateDownload = this.refs.downLoadLink.refs.input.value
    const templateGithub = this.refs.githubLink.refs.input.value
    const templateInfo = this.refs.info.refs.input.value
    const perviewerContext = this.getPerviewerDom({templateImg, templateDemo, templateDownload, templateGithub, templateInfo})
    this.setState({
      perviewerVisible: false,
      perviewerContext
    })
  }
  // 获取节点类型前瞻节点
  getPerviewerDom (valObj) {
    return $Constant.TEMPLATE.perviewer.replace(/\{\{\s.+\s\}\}/g, $0 => {
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
                <div class="tip">1.1 ${paragraph.title}</div>
                <div>${paragraph.context}</div>
              </div>
            `)
          }
        </div>
      </div>`)
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
}

export default CowEditor;
