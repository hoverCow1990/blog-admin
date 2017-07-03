import React, { Component } from 'react'
import {
  Icon,
  Modal,
  Input,
  message,
  Upload,
  Button
} from 'antd'
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
      perviewer: '',
      context: []
    }
  }
  render () {
    const {preViewUploadProps, perviewer} = this.state
    const context = this.state.context
    return (
      <div className="cow-editor">
        <div className="article-context">
          <div className="article-admin-title"><Icon type="file-text" />文章内容</div>
          <ul className="article-admin-tool">
            <li onClick={() => this.showPerviewerModal()}><Icon type="heart" /><span>前瞻部分</span></li><li><Icon type="tag" /><span>段落</span></li>
          </ul>
        </div>
        <div className="article-main">
          {perviewer}
        </div>
        <Modal
          title="Basic Modal"
          visible={this.state.perviewerVisible}
          onOk={() => this.handlePerviewerOk()}
          onCancel={() => this.handlePerviewerCancel()}
        >
          <Upload {...preViewUploadProps}>
            <Button>
              <Icon type="upload" /> 上传前瞻图
            </Button>
          </Upload>
          <Input placeholder="地址链接" size="large" />
          <Input placeholder="下载地址" size="large" />
          <Input type="textarea" placeholder="Autosize height with minimum and maximum number of lines" autosize={{ minRows: 2, maxRows: 6 }} />
        </Modal>
      </div>
    )
  }
  showPerviewerModal = () => {
    this.setState({
      perviewerVisible: true
    })
  }
  handlePerviewerOk = (e) => {
    console.log(e);
    this.setState({
      perviewerVisible: false
    })
  }
  handlePerviewerCancel = (e) => {
    console.log(e);
    this.setState({
      perviewerVisible: false
    })
  }
}

export default CowEditor;
