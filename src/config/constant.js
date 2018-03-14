const ENV = process.env.NODE_ENV

const HOST = {
  development: '/proxy/devApi/',
  production: 'http://www.web-jackiee.com/'
}

const HOME = {
  development: 'http://localhost:3000',
  production: 'http://www.web-jackiee.com'
}

const SERVERS = {
  development: 'http://localhost:3001',
  production: 'http://www.web-jackiee.com'
}

const HostUrl = HOST[ENV]
const HOMEPAGE = HOME[ENV]
const SERVERSPAGE = SERVERS[ENV]

const $Constant = {
  URL: {
    homePage: HOMEPAGE,
    serversPage: SERVERSPAGE,
    devHomePage: 'http://localhost:8080/#/',
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
      login: HostUrl + 'admin/login',
      checkLogin: HostUrl + 'admin/checkLogin',
      doDbs: HostUrl + 'admin/doDbs'
    },
    category: {
      getList: HostUrl + 'category/getList',
      addCategory: HostUrl + 'category/addCategory'
    },
    artcle: {
      getArticleList: HostUrl + 'article/getArticleList',
      searchArtcleList: HostUrl + 'article/searchArticleList',
      uploadImg: HostUrl + 'article/uploadImg',
      upLoadArticle: HostUrl + 'article/uploadArticle',
      getArticle: HostUrl + 'article/getArticle',
      deleteArticle: HostUrl + 'article/deleteArticle'
    },
    notices: {
      getNoticesList: HostUrl + 'notice/getNoticesList',
      seenNotice: HostUrl + 'notice/seenNotice',
      deleteNotice: HostUrl + 'notice/deleteNotice'
    }
  }
}

export default $Constant
