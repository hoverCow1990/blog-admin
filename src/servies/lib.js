const $Lib = {
  // 转换时间戳
  transTime (time) {
    time = new Date(Number(time) * 1000)
    return time.getFullYear() + '-' + this.getZeroNumber((time.getMonth() + 1)) + '-' + this.getZeroNumber(time.getDate()) + ' ' + this.getZeroNumber(time.getHours()) + ':' + this.getZeroNumber(time.getMinutes())+ ':' + this.getZeroNumber(time.getSeconds())
  },
  // 前位补0
  getZeroNumber (num) {
    return ('0' + num).slice(-2)
  },
  // 获取留言条数
  transMsgLength (str) {
    return str.split(',').length - 1
  }
}

export default $Lib
