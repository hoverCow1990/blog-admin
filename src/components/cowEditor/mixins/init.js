const Init = {
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
      console.log(perviewerContext)
      this.setState({
        mainContext,
        perviewerContext,
        initContextSwitch: true, // 首次加载后初始化文章的开关
        initInfoSwitch: false
      })
    }
  },
  // 初始化已存在的文章(id !== 0)的初始化
  componentDidUpdate () {
    if (this.state.initInfoSwitch) return
    this.initialPerviewer()
    this.initialArtcle()
  },
  // 初始化前瞻部分Input值
  initialPerviewer () {
    let perviewerDom = document.getElementsByClassName('article-perviewer')[0]
    if (perviewerDom.innerHTML) {
      let pImg = perviewerDom.getElementsByTagName('img')[0]
      let pDemo = perviewerDom.getElementsByClassName('watch')[0]
      let pDownload = perviewerDom.getElementsByClassName('download')[0]
      let pGithub = perviewerDom.getElementsByClassName('github')[0]
      let pDes = perviewerDom.getElementsByClassName('des')[0]
      let img = pImg.src
      let demoLink = pDemo.getElementsByTagName('a')[0].href
      let downLoadLink = pDownload.getElementsByTagName('a')[0].href
      let githubLink = pGithub ? pGithub.getElementsByTagName('a')[0].href : ''
      let info = pDes.innerText
      let perviewerVal = {
        img,
        demoLink,
        downLoadLink,
        githubLink,
        info
      }
      this.setState({
        initInfoSwitch: true,
        perviewerVal
      })
    }
  },
  // 初始化文章
  initialArtcle () {
    let mainDom = document.getElementsByClassName('context-box')
    let chapterList = []
    Array.from(mainDom).forEach((dom, index) => {
      let hd = dom.children[0]
      let bd = dom.children[1]
      let title = hd.children[0].innerHTML
      let para = bd.children
      let paragraphs = []
      Array.from(para).forEach(par => {
        let item = {
          title: par.children[0].innerHTML.replace(/^\d*\.\d*\s/, ''),
          context: par.children[1].innerHTML
        }
        paragraphs.push(item)
      })
      chapterList.push({
        title,
        paragraphs
      })
    })
    if (chapterList.length === 0) {
      chapterList = [{
        title: '',
        paragraphs: [{
          title: '',
          context: ''
        }]
      }]
    }
    this.setState({
      chapterList,
      initInfoSwitch: true
    })
  }
}

export default Init
