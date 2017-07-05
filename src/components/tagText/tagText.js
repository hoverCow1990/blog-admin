import React, { Component } from 'react'
import {
  input
} from 'antd'
import './tagText.less'

class TagText extends Component {
  constructor () {
    super()
    this.state = {

    }
  }
  render () {
    console.log(this.props)
    const {type, isVisible} = this.props
    let renderType = this.renderTagText(type)
    return (
      <div className="cowTagText" className={isVisible?"active":""}>
          <div className="cowTagText-title">增加一个 {type.toUpperCase()} 标签</div>
          {renderType}
      </div>
    )
  }
  renderTagText (type) {
    console.log(type)
    switch (type) {
      case 'p':
        return (<textarea type="textarea" placeholder="文章概要" className="ant-input cowTag-textArea" />)
    }
  }
}

export default TagText;
