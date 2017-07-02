import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import './login.less'

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!values.userName | !values.password) return
      this.requestLogin(values)
    });
  }
  requestLogin (values) {
    const {userName, password, remember} = values
    this.props.linkToCateGory()
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名' }],
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
          <Button type="primary" htmlType="submit" className="login-form-button">
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
    }
  }
  render () {
    return (
      <div id="login-view">
        <div className="login-masker"></div>
        <div className="login-container">
          <LoginForm linkToCateGory={() => this.linkToCateGory()}/>
        </div>
      </div>
    )
  }
  linkToCateGory () {
    this.props.history.push('/main/category')
  }
}

export default Login;
