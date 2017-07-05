import React, { Component } from 'react'
import {
  Icon,
  Modal,
  Input,
  message,
  Upload,
  Button
} from 'antd'
import $Constant from '@/config/constant'
import TagText from '@/components/tagText/tagText'
import './cowEditor.less'

class CowEditor extends Component {
  constructor () {
    super()
    this.state = {
      preViewUploadProps: {
        name: 'file',
        action: '//jsonplaceholder.typicode.com/posts/',
        headers: {
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
      perviewerVisible: false,
      perviewerContext: '',
      mainContext: [],
      perviewerVal: {
        img: '',
        demoLink: '',
        downLoadLink: '',
        info: ''
      },
      perviewerSwitch: true,
      paragraphVisible: false,
      paragraphList: [{
        title: '',
        list: [{
          title: 'hello',
          context: 'xixixi'
        }]
      }],
      activeParagraph: 0,
      activeItem: 0,
      isTagTextVisiable: false,
      tagText: ''

    }
  }
  render () {
    const {preViewUploadProps, perviewerContext, isTagTextVisiable, tagText} = this.state
    const context = this.state.context
    const paragraphModel = this.renderParagraphModel()
    return (
      <div className="cow-editor">
        <div className="article-context">
          <div className="article-admin-title"><Icon type="file-text" />文章内容</div>
          <ul className="article-admin-tool">
            <li onClick={() => this.showPerviewerModal()}><Icon type="heart" /><span>前瞻部分</span></li>
            <li onClick={() => this.showParagraphModal()}><Icon type="tag" /><span>段落</span></li>
          </ul>
        </div>
        <div className="article-main">
          <div className="article-box" dangerouslySetInnerHTML={{__html: perviewerContext}}></div>
        </div>
        <Modal
          title="Add Perviewer"
          visible={this.state.perviewerVisible}
          onOk={() => this.handlePerviewerOk()}
          onCancel={() => this.handlePerviewerCancel()}
        >
          <div className="editor-perviewer-model">
            <Upload {...preViewUploadProps}>
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
          title="Add Paragraph"
          visible={this.state.paragraphVisible}
          maskClosable={false}
          onOk={() => this.handleParagraphOk()}
          onCancel={() => this.handleParagraphCancel()}
        >
          {paragraphModel}
        </Modal>
        <TagText type={ tagText } isVisible={ isTagTextVisiable } hiddenTagText={() => this.hiddenTagText()} submitTagText={data => this.submitTagText(data)}></TagText>
      </div>
    )
  }
  // 渲染当前的ParagraphModel弹窗
  renderParagraphModel () {
    let { activeParagraph, paragraphList } = this.state
    let modelData = paragraphList[activeParagraph]
    let liDom = modelData.list.map((item, index) => (
      <li key={index}>
        <div className="item-hd">
          <p>{ '' + Math.ceil((index + 1)/ 10) + '.' + index % 10 + ' ' + item.title}</p>
          <div className="item-tool">
            <Icon type="copy" onClick={() => this.showTagText('p', index)}/>
            <Icon type="picture" />
            <Icon type="code-o" />
            <Icon type="link" />
            <Icon type="up-circle" onClick={() => this.exchangeParagraphItem(index, 'up')}/>
            <Icon type="down-circle" onClick={() => this.exchangeParagraphItem(index, 'down')}/>
            <Icon type="close-circle" onClick={() => this.removedParagraphItem(index)}/>
          </div>
        </div>
        <div className="item-bd">
          <input type="text" value={item.context} onChange={e => this.handlerBdValChange(e, index)}/>
        </div>
      </li>
    ))
    return (
      <div className="editor-paragraph-model">
        <div className="paragraph-hd">
          <Input placeholder="标题" size="large" ref="paragraphTitle"/>
          <div><Icon type="plus-square" onClick={() => this.addParagraphItem()}/></div>
        </div>
        <ul className="paragraph-list">
          { liDom }
        </ul>
      </div>
    )
  }
  // 显示编辑标签的弹窗
  showTagText (tagText, index) {
    this.setState({
      tagText,
      activeItem: index,
      isTagTextVisiable: true
    })
  }
  // 隐藏显示标签的弹窗
  hiddenTagText () {
    this.setState({
      isTagTextVisiable: false
    })
  }
  // 标签编辑弹窗点击确定后事件 将获取组件传递而来的value值
  submitTagText (data) {
    console.log(data)
    let { activeParagraph, paragraphList, activeItem } = this.state
    let modelData = paragraphList[activeParagraph]
    let list = modelData.list
    list[activeItem].context = list[activeItem].context + data.value
    modelData = Object.assign({}, {
      list
    })
    paragraphList[activeParagraph] = modelData
    this.setState({
      paragraphList
    })
    this.hiddenTagText()
  }
  // 增加一个段落
  addParagraphItem () {
    let { activeParagraph, paragraphList } = this.state
    let modelData = paragraphList[activeParagraph]
    let list = modelData.list
    list.push({
      title: '',
      context: '' + Math.random()
    })
    modelData = Object.assign({}, {
      list
    })
    paragraphList[activeParagraph] = modelData
    this.setState({
      paragraphList
    })
  }
  // 删除一个段落
  removedParagraphItem (index) {
    let { activeParagraph, paragraphList } = this.state
    let modelData = paragraphList[activeParagraph]
    let list = modelData.list
    list.splice(index, 1)
    modelData = Object.assign({}, {
      list
    })
    paragraphList[activeParagraph] = modelData
    this.setState({
      paragraphList
    })
  }
  // 交换一个段落位置
  exchangeParagraphItem (index, type) {
    let { activeParagraph, paragraphList } = this.state
    let modelData = paragraphList[activeParagraph]
    let list = modelData.list
    let changeItem = list[index]
    let beChengeNum = type === 'up' ? index - 1 : index + 1
    let beChengeItem = list[beChengeNum]
    if (beChengeItem) {
      list[index] = beChengeItem
      list[beChengeNum] = changeItem
    }
    modelData = Object.assign({}, {
      list
    })
    paragraphList[activeParagraph] = modelData
    this.setState({
      paragraphList
    })
  }
  // 处理该激活段落的对应小节的input改变事件
  handlerBdValChange (e, index) {

  }
  showPerviewerModal = () => {
    this.setState({
      perviewerVisible: true
    })
  }
  handlePerviewerOk = e => {
    const templateImg = 'http://www.web-jackiee.com/uploads/allimg/170313/1-1F313043542922.jpg'
    const templateDemo = this.refs.demoLink.refs.input.value
    const templateDownload = this.refs.downLoadLink.refs.input.value
    const templateGithub = this.refs.githubLink.refs.input.value
    const templateInfo = this.refs.info.refs.input.value
    const perviewerContext = this.getPerviewerDummydDom({templateImg, templateDemo, templateDownload, templateGithub, templateInfo})
    this.setState({
      perviewerVisible: false,
      perviewerContext
    })
    setTimeout(() => {
      document.getElementById('article-perviewer').onclick = () => {
        this.setState({
          perviewerVisible: true,
          perviewerSwitch: false
        })
      }
    }, 500)
  }
  handlePerviewerCancel () {
    this.setState({
      perviewerVisible: false
    })
  }
  getPerviewerDummydDom (valObj) {
    return $Constant.TEMPLATE.perviewer.replace(/\{\{\s.+\s\}\}/g, $0 => {
      return valObj[$0.match(/\w+/g)[0]]
    })
  }
  showParagraphModal = () => {
    this.setState({
      paragraphVisible: true
    })
  }
  handleParagraphOk () {
    this.setState({
      paragraphVisible: false
    })
  }
  handleParagraphCancel () {
    this.setState({
      paragraphVisible: false
    })
  }
}

export default CowEditor;
