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
      perviewerSwitch: true
    }
  }
  render () {
    const {preViewUploadProps, perviewerContext} = this.state
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
          <div className="article-box" dangerouslySetInnerHTML={{__html: perviewerContext}}></div>
        </div>
        <Modal
          title="Basic Modal"
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
            <Input type="textarea" ref="info" placeholder="Autosize height with minimum and maximum number of lines" autosize={{ minRows: 4, maxRows: 6 }} />
          </div>
        </Modal>
      </div>
    )
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
    // console.log()
    // document.getElementById('article-perviewer').onclick = () => {
    //   this.setState({
    //     perviewerVisible: true
    //   })
    // }
    setTimeout(() => {
      document.getElementById('article-perviewer').onclick = () => {
        this.setState({
          perviewerVisible: true,
          perviewerSwitch: false
        })
      }
    }, 500)
  }
  componentDidUpdate (a, b) {
    // let perviewer = document.getElementById('article-perviewer')
    // let {perviewerSwitch} = this.state
    // if (perviewer && perviewerSwitch) {
    //   console.log(111)
    //   document.getElementById('article-perviewer').onclick = () => {
    //     this.setState({
    //       perviewerVisible: true,
    //       perviewerSwitch: false
    //     })
    //   }
    // }
  }
  handlePerviewerCancel = (e) => {
    this.setState({
      perviewerVisible: false
    })
  }
  getPerviewerDummydDom (valObj) {
    return $Constant.TEMPLATE.perviewer.replace(/\{\{\s.+\s\}\}/g, $0 => {
      return valObj[$0.match(/\w+/g)[0]]
    })
  }
}

export default CowEditor;
