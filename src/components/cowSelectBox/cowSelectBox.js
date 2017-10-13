import React, { Component } from 'react'
import {
  Icon,
  Input,
  Checkbox
} from 'antd'
import './cowSelectBox.less'

class CowSelectBox extends Component {
  constructor () {
    super()
    this.state = {
      isFoucse: false, // 是否点击后变成焦点 显示下拉框
      secondType: [], // 用于存副栏目的id 用于上传的
      secondTitle: [], // 用于存副栏目的title 渲染在input内
      handlerClickBlur: null,  // 用于存绑定this的input焦点消失用于组建销毁时注销window事件
      inItSwitch: false // value只初始化一次
    }
  }
  // 注册点击外层失去焦点后关闭弹窗
  componentDidMount () {
    this.setState({
      handlerClickBlur: this.buildHandlerClickBlur()
    })
    setTimeout(() => {
      window.addEventListener('click', this.state.handlerClickBlur)
    })
  }
  // 注销关闭弹窗事件
  componentWillUnmount () {
    window.removeEventListener('click', this.state.handlerClickBlur)
  }
  // 用以触发初始化选择内容
  componentWillReceiveProps (nextProps) {
    if (this.state.inItSwitch) return
    if (nextProps.value.length && nextProps.categoryList.length) {
      this.setState({
        secondType: nextProps.value,
        secondTitle: this.getInitSecondTitle(nextProps.categoryList, nextProps.value),
        inItSwitch: true
      })
    }
  }
  // 初始化标题
  getInitSecondTitle (categoryList, value) {
    let arr = []
    for (let i = 0; i < categoryList.length; i++ ) {
      if (value.indexOf(categoryList[i].id) > -1) {
        arr.push(categoryList[i].title)
      }
      for (let j = 0; j < categoryList[i].childrens.length; j++) {
        if (value.indexOf(categoryList[i].childrens[j].id) > -1) {
          arr.push(categoryList[i].childrens[j].title)
          break
        }
      }
    }
    return arr
  }
  // 失去焦点点击盒子类名的判断
  buildHandlerClickBlur () {
    return e => {
      e = e || e.event
      let target = e.target
      let className = target.className
      if (/(article-bd|article admin-container|app-wrapper|inner-list|title|maxWidth pic|list-context|maxWidth maxHeight pic|maxWidth)/.test(className)) {
        this.setState({
          isFoucse: false
        })
      }
    }
  }
  render () {
    let { isFoucse, secondTitle } = this.state
    let selectBox = this.renderSelectCategory()
    return (
      <div className="cowSelectBox">
        <Input placeholder="Basic usage" onFocus = {(e) => this.handlerDropDown(e, true)} value={secondTitle.join(' / ')}/>
        <Icon type="down" className={isFoucse ? "down" : ""} onClick = {(e) => this.handlerDropDown(e)}/>
        <div className={isFoucse ? "selectBox down" : "selectBox"}>
          <ul className="select-category">
            {selectBox}
          </ul>
        </div>
      </div>
    )
  }
  // 处理焦点后下拉 bool为void 0时为点击箭头icon
  handlerDropDown (e, bool) {
    bool = void 0 === bool ? !this.state.isFoucse : bool
    this.setState({
      isFoucse: bool
    })
  }
  // 渲染顶级type
  renderSelectCategory () {
    const { categoryList, value } = this.props
    return categoryList.map(category => (
      <li className="category-context" key={category.id}>
        <div className="top-type"><Checkbox onChange={(e) => this.onChangeSelect(e, {id:category.id, title:category.title})} checked={value.indexOf(category.id) > -1}>{ category.title }</Checkbox></div>
        <ul className="type-context">
          {this.renderSelectType(category.childrens, value)}
        </ul>
      </li>
    ))
  }
  // 渲染二级type
  renderSelectType (childrens, value) {
    if (childrens instanceof Array) {
      return childrens.map(item => (
        <li key={item.id}>
          <Checkbox onChange={(e) => this.onChangeSelect(e, {id:item.id, title:item.title})}  checked={value.indexOf(item.id) > -1}>{ item.title }</Checkbox>
        </li>))
    }
  }
  // 改变需求的时候
  onChangeSelect (e, {id, title}) {
    const val = e.target.checked
    let { secondType, secondTitle } = this.state
    if (val) {
      secondType.push(id)
      secondTitle.push(title)
    } else {
      let index = secondType.indexOf(id)
      secondType.splice(index, 1)
      secondTitle.splice(index, 1)
    }
    this.props.onChangeSelect(secondType)
  }
}

export default CowSelectBox;
