import React, { Component } from 'react'
import {
  Button,
  Icon,
  message,
  Select,
  Input
} from 'antd'
import './tagEditor.less'
import CowUpload from '@/components/cowUpload/cowUpload'

const Option = Select.Option

class TagEditor extends Component {
  constructor () {
    super()
    this.state = {
      codeType: 'javascript',
      uploadProps: {
        name: 'file',
        action: this.$Constant.API.artcle.uploadImg
      },
      uploadPerviewer: ''
    }
  }
  render () {
    const { type, isVisible, hiddenTagEditor } = this.props
    let renderType = this.renderTagText(type)
    return (
      <div className={isVisible?"cowTagText active":"cowTagText"}>
          <div className="cowTagText-title"><Icon type="edit" />增加一个 {type.toUpperCase()} 标签</div>
          {renderType}
          <div className="cowTagText-btn">
            <Button onClick={hiddenTagEditor}>取消</Button>
            <Button type="primary" onClick={() => this.handlerTagEditorVal(type)}>确定</Button>
          </div>
      </div>
    )
  }
  // 渲染TagText
  renderTagText (type) {
    switch (type) {
      case 'title':
        return (<Input className="ant-input cowTag-titleInput" placeholder="标题" ref="title"/>)
      case 'p':
        return (
          <textarea type="textarea" placeholder="文章概要" className="ant-input cowTag-textArea" ref="textarea"/>
        )
      case 'img':
        return (
          <div className='upload'>
            <div className='upload-perviewer'>
              <img src={this.state.uploadPerviewer} alt=""/>
            </div>
            <div className='upload-input'>
              <CowUpload {...this.state.uploadProps} success={(res) => this.uploadSuccess(res)}/>
              <Input className="ant-input cowTag-aImg" placeholder="图片链接" ref="imgLink"/>
            </div>
          </div>)
      case 'code':
        return (
          <div className='code'>
            <Select defaultValue="javascript" onChange={val => this.handleCodeTypeChange(val)}>
              <Option value="javascript">Javascript</Option>
              <Option value="html">Html</Option>
              <Option value="css">css</Option>
              <Option value="java">java</Option>
            </Select>
            <textarea type="textarea" placeholder="文章概要" className="ant-input cowTag-textArea" ref="textarea"/>
          </div>
        )
      case 'a':
        return (
          <div className='aHref'>
            <Input className="ant-input cowTag-aInput" placeholder="标题" ref="title"/>
            <Input className="ant-input cowTag-aInput" placeholder="内容" ref="tag"/>
            <Input className="ant-input cowTag-aInput" placeholder="链接" ref="href"/>
          </div>)
      default:
        return ''
    }
  }
  handleCodeTypeChange (val) {
    this.setState({
      codeType: val
    })
  }
  handlerTagEditorVal (type) {
    switch (type) {
      case 'title':
        this.handlerTitle()
        break
      case 'p':
        this.handlerPval()
        break
      case 'code':
        this.handlerCodeval()
        break
      case 'a':
        this.handlerAval()
        break
      case 'img':
        this.handlerImgval()
        break
      default:
        return ''
    }
  }
  // 处理标题的确定
  handlerTitle () {
    const value = this.refs.title.refs.input.value
    this.props.submitTagEditor({
      type: 'title',
      value
    })
  }
  // 处理P标签的确定
  handlerPval () {
    const val = this.refs.textarea.value
    let value = val ? '<p>' + this.refs.textarea.value + '</p>' : ''
    this.props.submitTagEditor({
      type: 'p',
      value
    })
    this.refs.textarea.value = ''
  }
  // 处理code标签的确定
  handlerCodeval () {
    const val = this.refs.textarea.value
    let value = this.getCode(val)
    this.props.submitTagEditor({
      type: 'code',
      value
    })
    this.refs.textarea.value = ''
  }
  // 处理a标签的确定
  handlerAval () {
    const title = this.refs.title.refs.input.value
    const tag = this.refs.tag.refs.input.value
    const href = this.refs.href.refs.input.value
    if (!tag || !href) {
      message.error('内容或链接不能为空')
      return
    }
    let value = '<p><span>' + (title ? title + ' : ' : '') + '</span><a href="' + href + '" target="_blanket">' + tag + '</a></p>'
    this.props.submitTagEditor({
      type: 'a',
      value
    })
  }
  // 处理img标签的确定
  handlerImgval () {
    let uploadPerviewer = this.state.uploadPerviewer
    let imgLink = this.refs.imgLink.refs.input.value
    let value = ''
    if (imgLink) {
      value = uploadPerviewer ? '<a href="' + imgLink + '" target="_blanket"><img src="' + uploadPerviewer + '" alt="" /></a>' : ''
    } else {
      value = uploadPerviewer ? '<img src="' + uploadPerviewer + '" alt="" />' : ''
    }
    this.props.submitTagEditor({
      type: 'img',
      value
    })
    this.refs.imgLink.refs.input.value = ''
    this.setState({
      uploadPerviewer: ''
    })
  }
  // js分行
  getCode (val) {
    let count = 0
    let {codeType} = this.state
    let code
    let context = val.replace(/[^\n]+/g, $0 => {
      if (codeType === 'javascript') code = this.getJsCode($0)
      count++
      return `
        <li>
          <div class="count">${count}</div>
          <div class="content">
            <code>${code}</code>
          </div>
        </li>`
    })
    return `<div class="cow-code">
              <ul>
                ${context}
              </ul>
            </div>`
  }
  // 处理js细节代码
  getJsCode (code) {
    return code
    .replace(/("([^\\"\n]|\\.)*?"|'([^\\'\n]|\\.)*?'|`([^\\`\n]|\\.)*?`|\/[\s]+\/)/g, $0 => {
      let word = $0.match(/('|"|\/|`).+/)[0]
      let beforeSymbol = $0.match(/^(\s|\[|\(|,|:|\?|\+)+/)
      let before = beforeSymbol ? beforeSymbol[0] : ''
      return before + '<code class="yellow">' + word + '</code>'
    })
    .replace(/<(.{1,4})/g, ($0, $1) => {
      if (/code/.test($1) || /^<\/cod/.test($0)) return $0
      return '<code class="red"><</code>' + $1
    })
    .replace(/(.{1,4})>/g, ($0, $1) => {
      if (/code/.test($1) || /"$/.test($1)) return $0
      return $1 + '<code class="red">></code>'
    })
    .replace(/((const|var|let|class|extends)\s|function(\s|\()|(Math|Array|Symbol|Object)\.|\.(apply|slice|split|call|bind|apply|push|pop|unshift|concat|forEach|map|reduce|some|join|add|random|prototype|__proto__|getElementById|getClassName|queryselectorAll|hasOwnProperty|match|assign|ajax|repeat|padStart|padEnd|indexOf)|document|window|solve|reject|resolve)/g, $0 => {
      var word = $0.match(/\w+/)[0]
      var beforeSymbol = $0.match(/^\W/)
      var afterSymbol = $0.match(/\W$/)
      var before = beforeSymbol ? beforeSymbol[0] : ''
      var after = afterSymbol ? afterSymbol[0] : ''
      return before + '<code class="blue">' + word + '</code>' + after
    })
    .replace(/((if|for|super)(\s|\()|else(\s|\{)|(return|break)(\s|;)|(export|new|continue|default|delete|throw|while|typeof|switch|try|instanceof|with|catch|import)\s|this(\.|\s))/g, $0 => {
      var word = $0.match(/\w+/)[0]
      var symbol = $0.match(/\W/)[0] || ''
      return '<code class="red">' + word + '</code>' + symbol
    })
    .replace(/(\/\/.+|\/\*.?)$/, $0 => {
      return '<code class="grey">' + $0 + '</code>'
    })
    .replace(/^(\s?\*|\s\*\/).+$/, $0 => {
      return '<code class="grey">' + $0 + '</code>'
    })
    .replace(/(\s(\$|=>|>=|!==|<=|%|\*|\+|-|\/|\||\|\||&|&&|\?|:|in|do)\s|((\+|-){2})|\s={1,3}|\$)/g, $0 => {
      return '<code class="red">' + $0 + '</code>'
    })
    .replace(/(null|undefined|true|false)/g, $0 => {
      return '<code class="violet">' + $0 + '</code>'
    })
    .replace(/\W\d+/g, $0 => {
      var word = $0.match(/\d+/)[0]
      var beforeSymbol = $0.match(/^\W/)
      var before = beforeSymbol ? beforeSymbol[0] : ''
      if (before === '-') return '<code class="violet">' + $0 + '</code>'
      return before + '<code class="violet">' + word + '</code>'
    })
    .replace(/^\s+/, $0 => {
      return '&nbsp;'.repeat($0.length)
    })
  }
  // 上传图片成功
  uploadSuccess (res) {
    if (res.statue) {
      this.setState({
        uploadPerviewer: res.url
      })
    }
  }
}

export default TagEditor
