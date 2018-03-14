import React, { Component } from 'react'
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
      categoryList: [],
      nowCategory: 1
    }
  }
  render () {
    let {alertVisible, isSubmitLoding, alertTitle, inputVerify} = this.state
    let PanelList = this.renderPanelList()
    return (
      <div className="category admin-container">
        <div className="category-title admin-title">
          <p><Icon type="solution" />网站栏目管理</p>
          <div className="btn-group">
            <Button type="primary" onClick={() => this.showAlert(0)}><Icon type="plus-circle-o" />顶级栏目</Button>
          </div>
        </div>
        <div className="category-bd">
          <Collapse accordion>
            {PanelList}
          </Collapse>
          <div className="category-perview">
            <div className="category-container"></div>
          </div>
        </div>
        <Modal
          visible={alertVisible}
          title={alertTitle}
          onCancel={() => this.hidenAlert()}
          footer={[
            <Button key="back" size="large" onClick={() => this.hidenAlert()}>返回</Button>,
            <Button key="submit" type="primary" size="large" loading={isSubmitLoding} onClick={() => this.handlerSubmit()} >
              确定
            </Button>
          ]}
        >
          <div className="alert-container">
            <Input className={inputVerify ? "" : "err"} size="large" placeholder="栏目名称" onChange={e => this.handlerAddItemVal(e)} ref="addValInput" />
          </div>
        </Modal>
      </div>
    )
  }
  componentWillMount () {
    this.requestCategoryList()
  }
  // 请求菜单列表
  requestCategoryList () {
    this.$Http({
      url: this.$Constant.API.category.getList,
      method: 'GET'
    }).then(res => {
      if (res.statue) {
        this.setState({
          categoryList: res.categoryList
        })
      }
    }).catch((err) => {
      console.log(err)
    })
  }
  // 顶级菜单的渲染
  renderPanelList () {
    let renderListDetail = this.renderListDetail.bind(this)
    return this.state.categoryList.map(item => (
      <Panel header={item.title} key={item.id}>
        <ul className="category-list">
          {renderListDetail(item.childrens)}
        </ul>
        <div className="btn-group addItem">
          <Button type="primary"  onClick={() => this.showAlert(item.title)}><Icon type="plus-circle-o" />二级栏目</Button>
        </div>
      </Panel>
    ))
  }
  // 二级菜单的渲染
  renderListDetail (item) {
    let {homePage} = this.$Constant.URL
    return item.map(item => (
      <li key={item.id}>
        <p className="tag">{item.title}</p>
        <div className="control">
          <span><a href={`${homePage}/article/${item.id}`} target="_blanket">预览<Icon type="eye-o" /></a></span>
        </div>
      </li>
    ))
  }
  // 显示alert
  showAlert (type) {
    let alertTitle
    let nowCategory
    if (type) {
      alertTitle = '添加二级栏目'
      nowCategory = type
    } else {
      alertTitle = '添加顶级栏目'
      nowCategory = ''
    }
    this.setState({
      alertTitle,
      nowCategory,
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
    this.setState({
      isSubmitLoding: true
    })
    let {addItemVal, nowCategory} = this.state
    if (!addItemVal || /^\d+$/.test(addItemVal)) {
      this.setState({
        inputVerify: false
      })
      message.error('请填写正确的栏目名')
    } else {
      this.setState({
        inputVerify: true
      })
      this.$Http({
        url: this.$Constant.API.category.addCategory,
        method: 'POST',
        data: {
          title: addItemVal,
          par: nowCategory
        }
      }).then(res => {
        // let perItem = categoryList.find(item => item.id === nowCategory)
        // perItem.childrens.push({
        //   title: addItemVal,
        //   perId: this.state.nowCategory,
        //   id: res.id,
        //   artcleNum: 0
        // })
        if (res.statue) {
          this.setState({
            alertVisible: false,
            addItemVal: '',
            categoryList: res.categoryList,
            isSubmitLoding: false
          })
          this.refs.addValInput.refs.input.value = ''
          message.success('添加成功')
        } else {
          message.error('添加失败')
        }
      }).catch(() => {
        message.error('添加失败')
        this.setState({
          isSubmitLoding: false
        })
      })
    }
  }
}

export default Category
