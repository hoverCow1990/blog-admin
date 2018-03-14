import React, {
  Component
} from 'react'
import {
  Table,
  Button,
  Modal,
  Icon,
  message
} from 'antd'
import './noticesBoard.less'

const confirm = Modal.confirm

class NoticesBoard extends Component {
  constructor() {
    super()
    this.state = {
      pagination: {
        current: 1,
        total: 0,
        defaultPageSize: 20,
        onChange: (index) => {
          let pagination = this.state.pagination
          pagination.current = index
          this.setState({
            pagination
          })
          this.requestNoticesList(index - 1)
        }
      },
      noSeenLength: 0,
      selectedRowKeys: [],
      isLoading: false,
      columns: [{
        title: '头像',
        className: 'logo',
        dataIndex: 'user',
        width: 70,
        render: (user, record, index) => {
          let img = `<img src="${this.$Constant.URL.serversPage}/uploads/user/${user.id}/logo.${user.logoType}">`
          return (
            <div className="logoImg" dangerouslySetInnerHTML={{ __html: img }} />
          )
        }
      }, {
        title: '用户名',
        dataIndex: 'user.name',
        width: 90,
      }, {
        title: '操作类型',
        dataIndex: 'type',
        width: 100,
      }, {
        title: '详情',
        dataIndex: 'info'
      }, {
        title: '用户id',
        dataIndex: 'user.id',
        width: 260,
      }, {
        title: '是否审阅',
        dataIndex: 'hasSeen',
        width: 80,
        render: (boolean, data, index) => {
          let color = this.getTypeColor(data.type)
          return !boolean ? <div className={`noSeen ${color}`} onClick={() => this.handlerSeen(data.id, index)}>!</div> : null
        }
      }],
      messageList: []
    }
  }
  componentWillMount() {
    this.requestNoticesList(0)
  }
  render() {
    const { selectedRowKeys, columns, pagination, noSeenLength } = this.state
    const { messageList } = this.state
    const hasSelected = selectedRowKeys.length > 0
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    }
    return (
      <div className = "admin-messageBoard admin-container" >
        <div className="category-title admin-title">
          <p><Icon type="solution" />操作日志</p><div className="noSeen red">{noSeenLength}</div>
        </div>
        <Table
          pagination = {pagination}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={messageList} />
        <div className="messageBoard-delete">
          <Button type="danger" onClick={() => this.deleteCommit(1)}>删除</Button>
          <Button type="danger" onClick={() => this.deleteCommit(2)}>已阅</Button>
        </div>
      </div>
    )
  }
  // 请求消息列表
  requestNoticesList (st) {
    let { defaultPageSize } = this.state.pagination
    st = st * defaultPageSize
    let end = defaultPageSize
    this.$Http({
      url: this.$Constant.API.notices.getNoticesList,
      method: 'POST',
      data: {
        st,
        end
      }
    }).then(res => {
      let { pagination } = this.state
      if (res.statue) {
        let messageList = res.noticesList.map((item, index) => ({
          key: index,
          ... item
        }))
        pagination.total = res.allLength
        this.setState({
          noSeenLength: res.noSeenLength,
          messageList,
          pagination
        })
      }
    }).catch(err => {
        message.error('获取列表失败' + err)
    })
  }
  // 以及阅读 data index 传入数组批量操作
  handlerDelete (noticeId, index) {
    let { messageList } = this.state
    let isCantDelete = messageList.filter((item, i) => index.includes(i)).some(item => !item.hasSeen)
    if (isCantDelete) return message.error('有未读消息,不能删除')
    if (!noticeId.length) return message.error('请选择需要删除的消息')

    this.$Http({
      url: this.$Constant.API.notices.deleteNotice,
      method: 'POST',
      data: {
        noticeId
      }
    }).then(res => {
      if (res.statue === 1) {
        messageList = messageList.filter((item, i) => !index.includes(i))
        this.setState({
          messageList,
          selectedRowKeys: []
        })
        message.success('操作成功')
      }
    }).catch(err => {
      message.error('操作失败' + err)
    })
  }
  // 以及阅读 data index 传入数字的时候单个操作 数组则批量操作
  handlerSeen (noticeId, index) {
    this.$Http({
      url: this.$Constant.API.notices.seenNotice,
      method: 'POST',
      data: {
        noticeId
      }
    }).then(res => {
      let { messageList, noSeenLength } = this.state
      if (res.statue) {
        let seeLength = 1 // 已阅总数 - 1
        if (Array.isArray(index)) { // 批量已阅
          index.forEach(i => {
            messageList[i].hasSeen = true
          })
          seeLength = res.seeLength  // 已阅总数 - 返回值
        } else {
          messageList[index].hasSeen = true // 单个已阅
        }
        this.setState({
          messageList,
          noSeenLength: noSeenLength - seeLength,
          selectedRowKeys: []
        })
        message.success('操作成功')
      } else {
        message.error('操作失败')
      }
    }).catch(err => {
      message.error('操作失败' + err)
    })
  }
  deleteCommit (type) {
    const _self = this
    let title = '批量' + (type === 1 ? '删除' : '已阅')
    confirm({
      title,
      content: '是否确定要操作?',
      onOk: () => {
        const { selectedRowKeys, messageList } = this.state
        let idArray = selectedRowKeys.map(num => messageList[num].id)
        if (type === 1) { // 批量删除
          _self.handlerDelete(idArray, selectedRowKeys)
        } else if (type === 2) { // 批量已阅读
          _self.handlerSeen(idArray, selectedRowKeys)
        }
      }
    })
  }

  getTypeColor (type) {
    switch (type) {
      case '作品上传':
        return 'red'
      case '用户注册':
        return 'green'
      case '签到':
        return 'blue'
      case '文章留言':
      case '留言板留言':
        return 'yellow'
      default:
        return ''
    }
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys })
  }
}

export default NoticesBoard;
