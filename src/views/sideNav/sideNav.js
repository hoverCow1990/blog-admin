import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import './sideNav.less'

const SubMenu = Menu.SubMenu;

class SideNav extends Component {
  constructor () {
    super()
    this.state = {
      current: 'category',
      defaultOpenKeys: ['sub1']
    }
  }
  componentWillMount () {
    this.initialState() // 根据路由初始化打开的tab
  }
  render () {
    const { defaultOpenKeys } = this.state
    return (
      <div className="admin-sideNav">
        <Menu
          theme="dark"
          onClick={this.handleClick}
          style={{ width: '100%' }}
          defaultOpenKeys={defaultOpenKeys}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
          <SubMenu key="sub1" title={<span><Icon type="share-alt" /><span>Main Operation</span></span>}>
            <Menu.Item key="category">网站栏目管理</Menu.Item>
            <Menu.Item key="articleList">文章列表</Menu.Item>
            <Menu.Item key="article">新增 / 修改文章</Menu.Item>
            <Menu.Item key="hotKey">热门关键词</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="edit" /><span>Comment</span></span>}>
            <Menu.Item key="messageBoard">留言板评论</Menu.Item>
            <Menu.Item key="messageArticle">文章页评论</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" title={<span><Icon type="user-add" /><span>Member</span></span>}>
            <Menu.Item key="number">会员积分</Menu.Item>
            <Menu.Item key="numberDemo">会员作品审核</Menu.Item>
          </SubMenu>
          <SubMenu key="sub4" title={<span><Icon type="rocket" /><span>Game</span></span>}>
            <Menu.Item key="game">游戏管理</Menu.Item>
          </SubMenu>
          <SubMenu key="sub5" title={<span><Icon type="dot-chart" /><span>Blog Chart</span></span>}>
            <Menu.Item key="dataChart">博客数据图表</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }
  // 侧导航点击事件
  handleClick = (e) => {
   const key = e.key
   let location = key === 'article' ? '/main/article?id=0' : `/main/${key}`
   this.setState({
     current: key,
   })
   this.props.history.push(location)
 }
 // 获取初始打开的tab
 initialState () {
   let type = this.props.match.params.type
   let defaultOpenKeys = this.getdefaultOpenKeys(type)
   this.setState({
     current: type,
     defaultOpenKeys: [defaultOpenKeys]
   })
 }
 // 获取sub
 getdefaultOpenKeys (type) {
   switch (type) {
     case 'category':
     case 'articleList':
     case 'article':
     case 'hotKey':
       return 'sub1'
     case 'messageBoard':
     case 'messageArticle':
       return 'sub2'
     case 'number':
     case 'numberDemo':
       return 'sub3'
     case 'game':
       return 'sub4'
     case 'dataChart':
       return 'sub5'
     default:
       return ''
   }
 }
}

export default SideNav;
