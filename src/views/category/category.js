import React, { Component } from 'react'
import $Constant from '@/config/constant'
import {
  Icon,
  Button,
  Collapse,
  Modal,
  Input,
  message
} from 'antd'
import './category.less'

const Panel = Collapse.Panel

class Category extends Component {
  constructor () {
    super()
    this.state = {
      alertVisible: false, // 弹窗显示隐藏
      isSubmitLoding: false, // 是否提交表单
      inputVerify: true, // 添加栏目的验证
      alertTitle: '', // 弹窗标题
      alertType: '',  // 0为顶级栏目 1后为二级栏目的id
      addItemVal: '',
      categoryList: [{
          title: 'javascript',
          id: 1,
          childrens: [{
              title: 'vue',
              id: 2
            }, {
              title: 'angular',
              id: 3
            }, {
              title: 'react',
              id: 4
            }, {
              title: 'backbone',
              id: 5
            }, {
              title: 'es6',
              id: 6
            }, {
              title: 'jquery',
              id: 7
            }, {
              title: 'backbone',
              id: 8
            }]
      }, {
          title: 'html',
          id: 9,
          childrens: [{
              title: 'html',
              id: 10
            }, {
              title: 'less',
              id: 11
            }, {
              title: 'sass',
              id: 12
            }, {
              title: 'BootsTrip',
              id: 23
            }]
      }, {
          title: 'node/java',
          id: 13,
          childrens: [{
              title: 'http',
              id: 14
            }, {
              title: 'node',
              id: 15
            }, {
              title: 'java',
              id: 16
            }, {
              title: 'php',
              id: 18
            }]
      }, {
          title: 'others',
          id: 19,
          childrens: [{
              title: 'photoshop',
              id: 20
            }, {
              title: 'dede',
              id: 21
            }, {
              title: 'tool',
              id: 22
            }]
      }]
    }
  }
  render () {
    const changeCategory = this.changeCategory
    const showAlert = this.showAlert.bind(this)
    const hidenAlert = this.hidenAlert.bind(this)
    const handlerAddItemVal = this.handlerAddItemVal.bind(this)
    const handlerSubmit = this.handlerSubmit.bind(this)
    let {alertVisible, isSubmitLoding, alertTitle, inputVerify} = this.state
    let PanelList = this.renderPanelList()
    return (
      <div className="category admin-container">
        <div className="category-title">
          <p><Icon type="solution" />网站栏目管理</p>
          <div className="btn-group">
            <Button type="primary" onClick={() => showAlert(0)}><Icon type="plus-circle-o" />顶级栏目</Button>
          </div>
        </div>
        <div className="category-bd">
          <Collapse accordion defaultActiveKey={['1']} onChange={changeCategory}>
            {PanelList}
          </Collapse>
        </div>
        <Modal
          visible={alertVisible}
          title={alertTitle}
          onOk={handlerSubmit}
          onCancel={hidenAlert}
          footer={[
            <Button key="back" size="large" onClick={hidenAlert}>Return</Button>,
            <Button key="submit" type="primary" size="large" loading={isSubmitLoding} onClick={handlerSubmit}>
              Submit
            </Button>,
          ]}
        >
          <div className="alert-container">
            <Input className={inputVerify ? "" : "err"} size="large" placeholder="栏目名称" onChange={e => handlerAddItemVal(e)}/>
          </div>
        </Modal>
      </div>
    );
  }
  // 顶级菜单的渲染
  renderPanelList () {
    let renderListDetail = this.renderListDetail
    let showAlert = this.showAlert.bind(this)
    return this.state.categoryList.map(item => (
      <Panel header={item.title} key={item.id}>
        <ul className="category-list">
          {renderListDetail(item.childrens)}
        </ul>
        <div className="btn-group addItem">
          <Button type="primary"  onClick={() => showAlert(item.id)}><Icon type="plus-circle-o" />二级栏目</Button>
        </div>
      </Panel>
    ))
  }
  // 二级菜单的渲染
  renderListDetail (item) {
    let {homePage} = $Constant.URL
    return item.map(item => (
      <li key={item.id}>
        <p className="tag">{item.title}</p>
        <div className="control">
          <span><a href={`${homePage}/article/${item.id}`} target="_blanket">预览</a></span>
          <span>删除</span>
        </div>
      </li>
    ))
  }
  // 显示alert
  showAlert (type) {
    let alertTitle = type ? '添加二级栏目' : '添加顶级栏目'
    this.setState({
      alertTitle,
      alertType: type,
      alertVisible: true
    })
  }
  // 隐藏alert
  hidenAlert () {
    this.setState({
      alertVisible: false
    })
  }
  // input输入事件
  handlerAddItemVal (e) {
    this.setState({
      addItemVal: e.target.value
    })
  }
  // 提交表单
  handlerSubmit () {
    let addItemVal = this.state.addItemVal
    if (!addItemVal | /\d+/.test(addItemVal)) {
      this.setState({
        inputVerify: false
      })
      message.error('请填写正确的栏目名')
    } else {
      this.setState({
        inputVerify: true
      })
    }
  }
  changeCategory (key) {
    console.log(key)
  }
}

export default Category
