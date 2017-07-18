import React, { Component } from 'react'
import {
  Button,
  Icon,
  Upload,
  message,
  Select,
  Input
} from 'antd'
import './tagEditor.less'

const Option = Select.Option

class TagEditor extends Component {
  constructor () {
    super()
    this.state = {
      codeType: 'javascript'
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
        return (<textarea type="textarea" placeholder="文章概要" className="ant-input cowTag-textArea" ref="textarea"/>)
      case 'img':
        return (
          <div className='upload'>
            <Upload
              name='file'
              action='//jsonplaceholder.typicode.com/posts/'
              headers={{
                authorization: 'authorization-text',
              }}
              onChange= {info => {
                if (info.file.status !== 'uploading') {
                  console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                  message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                  message.error(`${info.file.name} file upload failed.`);
                }
              }}>
              <Button>
                <Icon type="upload" /> Click to Upload
              </Button>
            </Upload>
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
      default:
        return ''
    }
  }
  handlerTitle () {
    const value = this.refs.title.refs.input.value
    this.props.submitTagEditor({
      type: 'title',
      value
    })
  }
  handlerPval () {
    const val = this.refs.textarea.value
    let value = val ? '<p>' + this.refs.textarea.value + '</p>' : ''
    this.props.submitTagEditor({
      type: 'p',
      value
    })
    this.refs.textarea.value = ''
  }
  handlerCodeval () {
    const val = this.refs.textarea.value
    let value = this.getCode(val)
    this.props.submitTagEditor({
      type: 'code',
      value
    })
    this.refs.textarea.value = ''
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
    return '<div class="cow-code"><ul>' + context + '</ul></div>'
  }
  // 处理js细节代码
  getJsCode (code) {
    return code
    .replace(/`/, '<span>`</span>')
    .replace(/("([^\\"\n]|\\.)*"|'([^\\"\n]|\\.)*'|\/.+\/)/, $0 => {
      return '<span class="yellow">' + $0 + '</span>'
    })
    .replace(/((const|var|function|let|class|extends)\s|(Math|Array|Symbol|Object)\.|\.(slice|split|call|bind|apply|push|pop|unshift|concat|forEach|map|reduce|some|join|add|prototype|__proto__|getElementById|getClassName|queryselectorAll|hasOwnProperty|match|assign|ajax|repeat|padStart|padEnd|indexOf)|document|window|solve|reject|resolve)/g, $0 => {
      var word = $0.match(/\w+/)[0]
      var beforeSymbol = $0.match(/^\W/)
      var afterSymbol = $0.match(/\W$/)
      var before = beforeSymbol ? beforeSymbol[0] : ''
      var after = afterSymbol ? afterSymbol[0] : ''
      return before + '<span class="blue">' + word + '</span>' + after
    })
    .replace(/((if|for|super)(\s|\()|else(\s|\{)|(return|break)(\s|;)|(export|new|continue|default|delete|throw|while|typeof|switch|try|instanceof|in|do|with|catch|import)\s|this(\.|\s))/g, $0 => {
      var word = $0.match(/\w+/)[0]
      var symbol = $0.match(/\W/)[0] || ''
      return '<span class="red">' + word + '</span>' + symbol
    })
    .replace(/(\s(={1,3}|<|>|=>|>=|<=|%|\*|\+|-|\/|\||\|\||&|&&)\s|((\+|-){2}))/g, $0 => {
      return '<span class="red">' + $0 + '</span>'
    })
    .replace(/\/\/.+$/, $0 => {
      return '<span class="grey">' + $0 + '</span>'
    })
    .replace(/(null|undefined)/g, $0 => {
      return '<span class="violet">' + $0 + '</span>'
    })
    .replace(/\W\d+/g, $0 => {
      var word = $0.match(/\d+/)[0]
      var beforeSymbol = $0.match(/^\W/)
      var before = beforeSymbol ? beforeSymbol[0] : ''
      return before + '<span class="violet">' + word + '</span>'
    })
    .replace(/^\s+/, $0 => {
      return '&nbsp;'.repeat($0.length)
    })
  }
}

export default TagEditor;
