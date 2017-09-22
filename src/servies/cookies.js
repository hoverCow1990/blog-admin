const $Cookies = {
  setCookie(name, value, expiredays) {　　　
    let exdate = new Date()　　　
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = name + "=" + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())　
  },
  getCookie(name) {
    let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
    let arr = document.cookie.match(reg)
    if (arr) {
      return (arr[2])
    } else {
      return null
    }
  },
  removeCookie(name) {
    var exp = new Date()
    exp.setTime(exp.getTime() - 1)
    var cval = this.getCookie(name)
    if (cval != null) {
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString()
    }
  }
}

export default $Cookies
