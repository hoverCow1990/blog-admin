import {
  message
} from 'antd'

// 除了code外的所有标签
const Tags = {
  // 处理选择的标签
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
  },
  // 处理标题的确定
  handlerTitle () {
    const value = this.refs.title.refs.input.value
    this.props.submitTagEditor({
      type: 'title',
      value
    })
  },
  // 处理P标签的确定
  handlerPval () {
    const val = this.refs.textarea.value.split(/\n/)
    let value = val.map(v => {
      console.log(v)
      return v ? '<p>' + v + '</p>' : ''
    }).join('')

    this.props.submitTagEditor({
      type: 'p',
      value
    })
    this.refs.textarea.value = ''
  },
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
  },
  // 处理img标签的确定
  handlerImgval () {
    let uploadPerviewer = this.state.uploadPerviewer
    let imgLink = this.refs.imgLink.refs.input.value
    let value = ''
    console.log(uploadPerviewer)
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
  },
  // 上传图片成功
  uploadSuccess (res) {
    if (res.statue) {
      this.setState({
        uploadPerviewer: res.url
      })
    }
  }
}

export default Tags
