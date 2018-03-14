const ParaEvents = {
  // 初始化不为0的文章
  componentWillReceiveProps (nextProps) {
    if (this.state.initContextSwitch) return
    if (nextProps.initContext) {
      let {initContext} = nextProps
      // let perviewerContext = initContext.match(/([\s\S])*?<div class="context-box"/g)
      // let mainContext = initContext.match(/<div class="context-box">[\s\S]*/g)
      let {perviewerContext, context: mainContext} = initContext
      // perviewerContext = perviewerContext ? perviewerContext[0].replace(/<div class="context-box"$/, '') : ''
      // mainContext = mainContext ? mainContext[0] : ''
      this.setState({
        mainContext,
        perviewerContext,
        initContextSwitch: true, // 首次加载后初始化文章的开关
        initInfoSwitch: false
      })
    }
  },
  // 设置段落标题
  setChapterTitle (e) {
    const val = e.target.value
    let { chapterList, activeChapter } = this.state
    chapterList[activeChapter].title = val
    this.setState({
      chapterList
    })
  },
  // 删除段落
  deleteChapter (e, index) {
    e.stopPropagation()
    let { chapterList } = this.state
    if (chapterList.length === 1) return
    chapterList.splice(index, 1)
    this.setState({
      chapterList,
      activeChapter: 0
    })
    this.handleChapterOk()
  },
  // 鼠标点击切换焦点段落
  handlerChangeActiveParagraph (index) {
    this.setState({
      activeParagraph: index
    })
  },
  // 处理该激活段落的对应小节的input值改变事件
  handlerParagraphValChange (e, index) {
    let val = e.target.value
    let { chapterList, activeChapter, activeParagraph } = this.state
    let modelData = chapterList[activeChapter]
    let paragraphs = modelData.paragraphs
    paragraphs[activeParagraph].context = val
    this.setState({
      chapterList
    })
  },
  // 增加一个段落
  addParagraph (e) {
    let { chapterList, activeChapter } = this.state
    let modelData = chapterList[activeChapter]
    let paragraphs = modelData.paragraphs
    paragraphs.push({
      title: '',
      context: ''
    })
    this.setState({
      chapterList,
      activeParagraph: paragraphs.length - 1
    })
  },
  // 增加一个小节
  addChapter () {
    const chapterList = this.state.chapterList
    chapterList.push({ // 章节的所有内容列表
      title: '',
      paragraphs: [{  // 每个章节的段落项
        title: '',
        context: ''
      }]
    })
    this.setState({
      chapterList,
      activeChapter: chapterList.length - 1
    })
  },
  // 删除一个段落
  removeParagraph (index) {
    let { chapterList, activeChapter } = this.state
    let modelData = chapterList[activeChapter]
    let paragraphs = modelData.paragraphs
    if (paragraphs.length === 1) return
    paragraphs.splice(index, 1)
    this.setState({
      chapterList
    })
  },
  // 交换一个段落位置
  exchangeParagraph (index, type) {
    let { chapterList, activeChapter } = this.state
    let modelData = chapterList[activeChapter]
    let paragraphs = modelData.paragraphs
    let changeParagraph = paragraphs[index]
    let beChengeNum = type === 'up' ? index - 1 : index + 1
    let beChengeParagraph = paragraphs[beChengeNum]
    if (!beChengeParagraph) return
    paragraphs[index] = beChengeParagraph
    paragraphs[beChengeNum] = changeParagraph
    this.setState({
      chapterList
    })
  },
  // 获取章节数
  getParaNum (index) {
    return '' + Math.ceil((index + 1)/ 10) + '.' + index % 10
  }
}

export default ParaEvents
