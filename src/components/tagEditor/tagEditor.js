import React, { Component } from 'react'
import {
  input,
  Button,
  Icon
} from 'antd'
import './tagEditor.less'

class TagEditor extends Component {
  constructor () {
    super()
    this.state = {

    }
  }
  render () {
    const { type, isVisible, hiddenTagText } = this.props
    let renderType = this.renderTagText(type)
    return (
      <div className={isVisible?"cowTagText active":"cowTagText"}>
          <div className="cowTagText-title"><Icon type="edit" />增加一个 {type.toUpperCase()} 标签</div>
          {renderType}
          <div className="cowTagText-btn">
            <Button onClick={hiddenTagText}>取消</Button>
            <Button type="primary" onClick={() => this.handlerTagTextVal(type)}>确定</Button>
          </div>
      </div>
    )
  }
  // 渲染TagText
  renderTagText (type) {
    switch (type) {
      case 'p':
        return (<textarea id="pp" type="textarea" placeholder="文章概要" className="ant-input cowTag-textArea" ref="textarea"/>)
    }
  }
  handlerTagTextVal (type) {
    switch (type) {
      case 'p':
        this.handlerPval()
        break
    }
  }
  handlerPval () {
    let val = this.refs.textarea.value
    let value = val ? '<p>' + this.refs.textarea.value + '</p>' : ''
    this.props.submitTagEditor({
      type: 'p',
      value
    })
    this.refs.textarea.value = ''
  }
}

export default TagEditor;
