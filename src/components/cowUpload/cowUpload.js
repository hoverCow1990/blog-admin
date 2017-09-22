import React, { Component } from 'react'
import {
  Icon
} from 'antd'
import './cowUpload.less'

class CowUpload extends Component {
  constructor () {
    super()
    this.state = {
      fileName: '',
      isLoadingUpload: false
    }
  }
  render () {
    let {fileName, isLoadingUpload} = this.state
    return (
      <div className="cow-upload-wrapper">
        <div className="cow-file-upload">
          <div className="upload-face">
            <Icon type="upload" />
            <span>上传</span>
          </div>
          <input type="file"  onChange={(e) => this.handlerUpload(e)} accept='image/jpeg,image/jpg,image/png,image/gif'/>
        </div>
        <div className="cow-file-text">
          <Icon type="loading" className={isLoadingUpload?"exist":""}/>
          <span>{fileName}</span>
        </div>
      </div>
    )
  }
  handlerUpload (e) {
    let url = this.props.action
    let file = e.target.files[0]
    if (!file) return
    this.setState({
      fileName: file.name,
      isLoadingUpload: true
    })
    const formData = new FormData()
    formData.append('file', file)
    this.$Http({
      url,
      method: 'POST',
      data: formData
    }).then(res => {
      this.setState({
        isLoadingUpload: false
      })
      this.props.success(res)
    }).catch(err => {
      this.setState({
        isLoadingUpload: false
      })
    })
  }
}

export default CowUpload
