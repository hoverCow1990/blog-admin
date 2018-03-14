import React, {
  Component
} from 'react'
import {
  Button,
  message,
  Modal,
  Input,
  Icon
} from 'antd'
import './dbs.less'

class Nember extends Component {
  constructor() {
    super()
    this.state = {
      visible: false,
      type: 0,
      password: '',
      isRequest: false
    }
  }
  render() {
    let { type, isRequest } = this.state
    return (
      <div className="admin-dbs admin-container" >
        <div className="article-title admin-title">
          <p><Icon type="edit" />数据库备份还原</p>
        </div>
        <div>
          <img src={require('./images/3.jpg')} />
        </div>
        <div className="dbs-control">
          <Button type="primary" size="large" onClick={() => this.showModal(0)}>备份</Button>
          <Button type="primary" size="large" onClick={() => this.showModal(1)}>还原</Button>
        </div>
        <Modal
          title={ type === 0 ? '数据备份' : '数据还原'}
          visible={this.state.visible}
          footer={[
            <Button key="back" size="large" onClick={this.handleCancel}>返回</Button>,
            <Button key="submit" type="primary" size="large" loading={isRequest} onClick={this.handleOk}>提交</Button>
          ]}
        >
          <p className="dbs-not">{ type === 0 ? '确定后您将[备份]您的数据信息' : '确定后您将[还原]您的数据信息' }</p>
          <Input ref="password" placeholder="密码" onChange={e => this.changePassword(e)} />
        </Modal>
      </div>
    )
  }
  changePassword (e) {
    this.setState({
      password: e.target.value
    })
  }
  showModal = (type) => {
    this.setState({
      type,
      visible: true,
    });
  }
  handleOk = (e) => {
    let { type, password } = this.state
    this.setState({
      isRequest: true
    })
    this.$Http({
      url: this.$Constant.API.user.doDbs,
      method: 'POST',
      data: {
        type,
        password
      }
    }).then(res => {
      if (res.statue === 1) {
        message.success('操作成功')
        this.setState({
          isRequest: false,
          visible: false,
          password: ''
        })
        this.refs.password.refs.input.value = ''
      } else {
        message.error('操作失败')
      }
    }).catch(err => {
      message.error('操作失败' + err)
    })
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    })
  }
}

export default Nember
