const $Constant = {
  URL: {
    homePage: 'http://www.web-jackiee.com'
  },
  TEMPLATE: {
    perviewer: `
      <div class="perviewer">
        <img src="{{ templateImg }}" />
      </div>
      <div class="des">
        <p>{{ templateInfo }}</p>
      </div>
      <div class="btn-group">
        <div class="btn download">
          <a href="{{ templateDownload }}" target="_blank">
            <i class="iconfont icon-xiazai"></i>下载源码
          </a>
        </div>
        <div class="btn watch">
          <a href="{{ templateDemo }}" target="_blank">
            <i class="iconfont icon-yanjing"></i>在线演示
          </a>
        </div>
        <div class="btn github">
          <a href="{{ templateGithub }}" target="_blank">
            <i class="iconfont icon-github"></i>Github
          </a>
        </div>
      </div>`
  }
}

export default $Constant
