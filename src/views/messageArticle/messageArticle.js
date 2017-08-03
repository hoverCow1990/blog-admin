import React, {
  Component
} from 'react'
import {
  Table,
  Button,
  Modal,
  Icon
} from 'antd'
import './messageArticle.less'

const confirm = Modal.confirm

class MessageArticle extends Component {
  constructor() {
    super()
    this.state = {
      selectedRowKeys: [],
      isLoading: false,
      columns: [{
        title: '用户名',
        dataIndex: 'name',
        width: 120,
      }, {
        title: '评论文章',
        dataIndex: 'article',
        width: 200,
      }, {
        title: '留言内容',
        dataIndex: 'content',
      }],
      messageList: [{
        key: 0,
        id: 0,
        name: 'cow',
        article: 'es6新语法',
        content: '你好牛逼啊'
      }, {
        key: 1,
        id: 1,
        name: 'cow',
        article: 'javascript你不知道的秘密',
        content: '你好牛逼啊'
      }, {
        key: 2,
        id: 2,
        name: 'danian',
        article: '大年是个2货',
        content: '你好牛逼啊'
      }, {
        key: 3,
        id: 3,
        name: '小伙子',
        article: 'ps的神奇用法',
        content: '我是傻逼'
      }]
    }
  }
  render() {
    const { selectedRowKeys, columns } = this.state
    const { messageList } = this.state
    const hasSelected = selectedRowKeys.length > 0
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    }
    return (
      <div className = "admin-messageBoard admin-container" >
        <div className="category-title admin-title">
          <p><Icon type="solution" />文章页评论</p>
        </div>
        <div style={{ marginBottom: 16 }}>
          <span style={{ marginLeft: 5 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={messageList} />
        <div className="messageBoard-delete">
          <Button type="danger" onClick={() => this.deleteCommit()}>删除</Button>
        </div>
      </div>
    )
  }
  deleteCommit () {
    const _self = this
    confirm({
      title: '危险提示',
      content: '是否确定要删除?',
      onOk() {
        const {selectedRowKeys, messageList} = _self.state
        let idArray = selectedRowKeys.map(num => messageList[num].id)
        console.log(idArray)
      }
    })
  }
  onSelectChange = (selectedRowKeys) => {
   this.setState({ selectedRowKeys })
  }
}

export default MessageArticle
