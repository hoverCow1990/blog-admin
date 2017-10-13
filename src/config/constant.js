const ENV = 'dev'

const HOST = {
  dev: '/proxy/devApi/',
  pro: 'http://web-jackiee.com/'
}

const HostUrl = HOST[ENV]

const $Constant = {
  URL: {
    homePage: 'http://localhost:3000'
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
  },
  API: {
    user: {
      login: HostUrl + 'backUser/login'
    },
    category: {
      getList: HostUrl + 'backCategory/getList',
      addCategory: HostUrl + 'backCategory/addCategory'
    },
    artcle: {
      getArticleList: HostUrl + 'backArticle/getArticleList',
      searchArtcleList: HostUrl + 'backArticle/searchArtcleList',
      uploadImg: HostUrl + 'backArticle/uploadImg',
      upLoadArticle: HostUrl + 'backArticle/upLoadArticle',
      getArticle: HostUrl + 'backArticle/getArticle',
      deleteArticle: HostUrl + 'backArticle/deleteArticle'
    }
  }
}

export default $Constant
