import React, { Component } from 'react'
import {
  Button,
  Icon,
  Select,
  Input
} from 'antd'
import './tagEditor.less'
import reactMixin from 'react-mixin'
import CowUpload from '@/components/cowUpload/cowUpload'
import codersMixins from './mixins/coders.js'
import tagsMixins from './mixins/tags.js'

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
}

export default reactMixin.onClass(TagEditor, {...codersMixins, ...tagsMixins})
