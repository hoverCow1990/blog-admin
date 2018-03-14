const AlertModel = {
  // 前瞻上传图片成功
  uploadSuccess (res) {
    if (res.statue) {
      let perviewerVal = Object.assign({}, this.state.perviewerVal, {
        img: res.url
      })
      this.setState({
        perviewerVal
      })
    }
  },
  // 标签编辑弹窗点击确定后事件 将获取组件传递而来的value值
  submitTagEditor (data) {
    let { chapterList, activeChapter, activeParagraph } = this.state
    let modelData = chapterList[activeChapter]
    let paragraphs = modelData.paragraphs
    if (data.type === 'title') {
      paragraphs[activeParagraph].title = data.value
      this.setState({
        chapterList
      })
    } else { // p标签 code img
      const input = this.refs[activeChapter + ' ' + activeParagraph]
      const addStart = input.selectionStart
      const lastVal = input.value
      const newVal = lastVal.substring(0, addStart) + data.value + lastVal.substring(addStart)
      paragraphs[activeParagraph].context = newVal
      this.setState({
        chapterList
      })
    }
    this.hiddenTagEditor()
  },
  // 改变前瞻窗口的input值改变后的值设定
  setPerviewerVal (key, e) {
    let value = e.target.value
    let perviewerVal = Object.assign({}, this.state.perviewerVal, {
      [key]: value
    })
    this.setState({
      perviewerVal
    })
  },
  // 前瞻弹窗确定按钮
  handlePerviewerOk (e) {
    let {img, demoLink, downLoadLink, githubLink, info} = this.state.perviewerVal
    const perviewerContext = this.getPerviewerDom({
      templateImg: img,
      templateDemo: demoLink,
      templateDownload: downLoadLink,
      templateGithub: githubLink,
      templateInfo: info
    }).replace(`<div class="btn github">
            <a href="" target="_blank">
              <i class="iconfont icon-github"></i>Github
            </a>
          </div>`, '')
    this.setState({
      perviewerVisible: false,
      perviewerContext
    })
  },
  // 显示前瞻弹窗
  showPerviewerModal () {
    this.setState({
      perviewerVisible: true
    })
  },
  // 取消前瞻弹窗
  handlePerviewerCancel () {
    this.setState({
      perviewerVisible: false
    })
  },
  // 显示编辑标签的弹窗
  showTagEditor (tagEditorType, index) {
    this.setState({
      tagEditorType,
      activeParagraph: index,
      isTagEditorVisiable: true
    })
  },
  // 隐藏编辑标签的弹窗
  hiddenTagEditor () {
    this.setState({
      isTagEditorVisiable: false
    })
  },
  // 显示章节弹窗
  showChapterModal (e, index) {
    const { paragraphTitle } = this.refs
    if (paragraphTitle) {
      paragraphTitle.refs.input.value = this.state.chapterList[index].title
    }
    this.setState({
      chapterVisible: true,
      activeChapter: index
    })
  },
  // 确定章节弹窗
  handleChapterOk () {
    let context = this.state.chapterList.map((chapter, index) =>
      `<div class="context-box">
        <div class="box-hd red">
          <span class="title">${chapter.title}</span>
          <span class="tag">${index}</span>
        </div>
        <div class="box-bd">
          ${
            chapter.paragraphs.map((paragraph, index) => `
              <div class="bd-para">
                <div class="tip">${this.getParaNum(index)} ${paragraph.title}</div>
                <div>${paragraph.context}</div>
              </div>
            `).join('')
          }
        </div>
      </div>`).join('')
    this.setState({
      mainContext: context,
      chapterVisible: false
    })
  },
  // 获取节点类型前瞻节点
  getPerviewerDom (valObj) {
    return this.$Constant.TEMPLATE.perviewer.replace(/\{\{\s.+\s\}\}/g, $0 => {
      return valObj[$0.match(/\w+/g)[0]]
    })
  },
  // 取消章节弹窗
  handleChapterCancel () {
    this.setState({
      chapterVisible: false
    })
  }
}

export default AlertModel
