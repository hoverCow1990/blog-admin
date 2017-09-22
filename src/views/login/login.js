import React, { Component } from 'react'
import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  message
} from 'antd'
import './login.less'

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  constructor () {
    super()
    this.state = {
      isRequsetLogin: false
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!values.userName | !values.password) return
      this.requestLogin(values)
    })
  }
  requestLogin (values) {
    const {userName, password, remember} = values
    this.setState({
      isRequsetLogin: true
    })
    this.$Http({
      url: this.$Constant.API.user.login,
      method: 'POST',
      data: {
        name: userName,
        password
      }
    }).then(res => {
      if (res.statue) {
        message.success(`登陆成功`)
        if (remember) {
          this.$Cookies.setCookie('userName', userName, 2592000)
        } else {
          this.$Cookies.removeCookie('userName')
        }
        this.setState({
          isRequsetLogin: false
        })
        this.props.linkToCateGory()
      } else {
        message.error(res.msg)
      }
    })
  }
  render() {
    let {oldNumber} = this.props
    let {isRequsetLogin} = this.state
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit = {this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名' }],
            initialValue: oldNumber
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem className="rember">
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
        </FormItem>
        <div className="btn-group">
          <Button type="primary" htmlType="submit" className="login-form-button" loading = {isRequsetLogin}>
            LogIn
          </Button>
        </div>
      </Form>
    )
  }
}

const LoginForm = Form.create()(NormalLoginForm);

class Login extends Component {
  constructor () {
    super()
    this.state = {
      oldNumber: ''
    }
  }
  componentWillMount () {
    this.setInitizalUser()
  }
  render () {
    const {oldNumber} = this.state
    return (
      <div id="login-view">
        <div className="login-masker"></div>
        <div className="login-container">
          <LoginForm oldNumber={oldNumber} linkToCateGory={() => this.linkToCateGory()}/>
        </div>
      </div>
    )
  }
  // 记住用户的调取cookie获取用户名
  setInitizalUser () {
    const userName = this.$Cookies.getCookie('userName')
    if (userName) {
      this.setState({
        oldNumber: userName
      })
    }
  }
  // 链接至
  linkToCateGory () {
    this.props.history.push('/main/category')
  }
}

export default Login;
