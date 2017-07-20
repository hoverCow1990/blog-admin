import React, {
  Component
} from 'react'
import {
  Table,
  Button
} from 'antd'
import './messageBoard.less'

class MessageBoard extends Component {
  constructor() {
    super()
    this.state = {
      selectedRowKeys: [],  // Check here to configure the default column
      isLoading: false,
      columns: [{
        title: '用户名',
        dataIndex: 'name',
        width: 150,
      }, {
        title: '留言内容',
        dataIndex: 'content',
      }],
      messageList: [{
        key: 0,
        name: 'cow',
        content: '你好牛逼啊'
      }, {
        key: 1,
        name: 'cow',
        content: '你好牛逼啊'
      }, {
        key: 2,
        name: 'danian',
        content: '你好牛逼啊'
      }, {
        key: 3,
        name: '小伙子',
        content: '我是傻逼'
      }]
    }
  }
  componentWillMount() {
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
        <div style={{ marginBottom: 16 }}>
          <span style={{ marginLeft: 5 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={messageList} />
      </div>
    )
  }
  onSelectChange = (selectedRowKeys) => {
   console.log('selectedRowKeys changed: ', selectedRowKeys);
   this.setState({ selectedRowKeys });
  }
}

export default MessageBoard;
