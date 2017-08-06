import React, {
  Component
} from 'react'
import {
  Button,
  Icon,
  Pagination
} from 'antd'
import './member.less'

class Nember extends Component {
  constructor() {
    super()
    this.state = {
      memberList: [{
        index: '01',
        feature: './images/user.jpg',
        name: '老实的牛',
        score: 26
      }, {
        index: '02',
        feature: './images/user.jpg',
        name: '大年',
        score: 126
      }, {
        index: '03',
        feature: './images/user.jpg',
        name: '小伙子',
        score: 58
      }],
      changeMember: [],
      isSubmitLoading: false
    }
  }
  render() {
    return (
      <div className="admin-member admin-container" >
        <div className="category-title admin-title">
          <p><Icon type="smile-o" />会员管理</p>
        </div>
        <div className="number-table">
          <ul className="table-topBar">
            <li className="index">序号</li>
            <li className="feature">头像</li>
            <li className="name">称号</li>
            <li className="score">积分</li>
          </ul>
          <ul className="table-bd">
            { this.renderMemberList() }
          </ul>
        </div>
        <div className="member-pagination">
          <Pagination defaultCurrent={1} total={50} onChange={this.changePagination}/>
        </div>
        <div className="member-submit">
          <Button type="primary" loading={this.state.isSubmitLoading}>提交</Button>
        </div>
      </div>
    )
  }
  // 渲染列表
  renderMemberList () {
    return this.state.memberList.map((item, index) => (
        <li className="table-col" key={item.index}>
          <ul className="col-list">
            <li className="index">{ item.index }</li>
            <li className="feature">
              <div className="feature-container">
                <img src={require("./images/user.jpg")} />
              </div>
            </li>
            <li className="name">{ item.name }</li>
            <li className="score"><input value={ item.score } onChange={ (e) => this.handlerValue(e, index) } /></li>
          </ul>
        </li>)
      )
  }
  // 改变值
  handlerValue (e, index) {
    const val = e.target.value
    this.state.memberList[index].score = val
    this.setState({
      memberList: this.state.memberList
    })
    this.recordChange(this.state.memberList[index].index)
  }
  // 记录变化的会员
  recordChange (index) {
    let { changeMember } = this.state
    if (!changeMember.includes(index)) {
      changeMember.push(index)
      this.setState({
        changeMember
      })
    }
  }
  changePagination (page) {
    console.log(page - 1)
  }
}

export default Nember
