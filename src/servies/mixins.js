const Mixins = {
  checkLogin () {
    this.$Http({
      url: this.$Constant.API.user.checkLogin,
      method: 'GET'
    }).then(res => {
      if (res.statue) {
        this.props.history.push('/main/articleList')
      }
    })
  }
}

export default Mixins
