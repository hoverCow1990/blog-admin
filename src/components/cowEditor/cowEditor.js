import React, { Component } from 'react'
import {
  Icon,
  Modal,
  Input
} from 'antd'
import reactMixin from 'react-mixin'
import TagEditor from '@/components/tagEditor/tagEditor'
import CowUpload from '@/components/cowUpload/cowUpload'
import initMixins from './mixins/init'
import alertModelMixins from './mixins/alertModel'
import paraEventsMixins from './mixins/paraEvents.js'
import './cowEditor.less'

// 老牛编辑器组件
class CowEditor extends Component {
  constructor () {
    super()
    this.state = {
      uploadProps: {
        name: 'file',
        action: this.$Constant.API.artcle.uploadImg
      },
      perviewerVisible: false, // perviewer弹窗是否可见
      perviewerContext: '', // perviewer弹窗内所有内容转为html格式的value信息
      perviewerVal: { // perviewer弹窗内单个input的
        img: '', // 图
        demoLink: '', // 网站demo的链接
        downLoadLink: '', //下载链接地址
        githubLink: '', // github下载地址
        info: ''  // 前瞻简介
      },
      mainContext: '',
      chapterVisible: false, // 章节弹窗是否显示
      chapterList: [{ // 章节的所有内容列表
        title: '',
        paragraphs: [{  // 每个章节的段落项
          title: '',
          context: ''
        }]
      }],
      activeChapter: 0, // 当前活动的章节信息
      activeParagraph: 0,  // 当前活动的段落信息
      isTagEditorVisiable: false, // 是否tag标签编辑器可见
      tagEditorType: '', // tag标签的类型 比如p 或是 image
      initContextSwitch: false, // 首次加载id!=0后初始化文章的开关
      initInfoSwitch: true
    }
  }
  render () {
    const { perviewerContext, isTagEditorVisiable, tagEditorType, perviewerVisible, chapterVisible, mainContext, perviewerVal, uploadProps } = this.state
    return (
      <div className="cow-editor">
        <div className="article-editTool">
          <div className="article-admin-title"><Icon type="file-text" />文章内容</div>
          <ul className="article-admin-tool">
            <li onClick={() => this.showPerviewerModal()}><Icon type="heart" /><span>前瞻部分</span></li>
            { this.renderChapterLi() }
            <li onClick={() => this.addChapter()}><Icon type="plus-circle" /><span>增加段落</span></li>
          </ul>
        </div>
        <div className="article-main">
          <div className="article-box">
            <div className="article-perviewer" dangerouslySetInnerHTML={{ __html: perviewerContext }} onClick={() => this.showPerviewerModal()}></div>
            <div id="context" className={perviewerContext ? "article-context hasDash" : "article-context"} dangerouslySetInnerHTML={{ __html: mainContext }}></div>
          </div>
        </div>
        <Modal
          title="Add Perviewer"
          visible={perviewerVisible}
          onOk={() => this.handlePerviewerOk()}
          onCancel={() => this.handlePerviewerCancel()}
        >
          <div className="editor-perviewer-model">
            <CowUpload {...uploadProps} success={(res) => this.uploadSuccess(res)}/>
            <Input placeholder="地址链接" size="large" ref="demoLink" value={perviewerVal.demoLink} onChange={(e) => this.setPerviewerVal('demoLink', e)} />
            <Input placeholder="下载地址" size="large" ref="downLoadLink" value={perviewerVal.downLoadLink} onChange={(e) => this.setPerviewerVal('downLoadLink', e)} />
            <Input placeholder="github" size="large" ref="githubLink" value={perviewerVal.githubLink} onChange={(e) => this.setPerviewerVal('githubLink', e)} />
            <Input type="textarea" ref="info" placeholder="文章简述" autosize={{ minRows: 4, maxRows: 6 }} value={perviewerVal.info}  onChange={(e) => this.setPerviewerVal('info', e)}/>
          </div>
        </Modal>
        <Modal
          title="Add Chapter"
          visible={chapterVisible}
          maskClosable={false}
          onOk={() => this.handleChapterOk()}
          onCancel={() => this.handleChapterCancel()}
        >
          { this.renderChapterModel() }
        </Modal>
        <TagEditor type={ tagEditorType } isVisible={ isTagEditorVisiable } hiddenTagEditor={() => this.hiddenTagEditor()} submitTagEditor={data => this.submitTagEditor(data)} />
      </div>
    )
  }
  // 渲染段落一 二的按钮
  renderChapterLi () {
    return this.state.chapterList.map((item, index) => {
      return (
        <li key={index}
          onClick={(e) => this.showChapterModal(e, index)}>
            <span className="delete" onClick={e => this.deleteChapter(e, index)}>
              <img src={require('./images/1.png')} alt="" />
            </span>
            <Icon type="tag" className="icon"/><span>段落{ index + 1}</span>
        </li>
      )
    })
  }
  // 渲染当前的ChapterModel 章节弹窗
  renderChapterModel () {
    let { chapterList, activeChapter } = this.state
    let modelData = chapterList[activeChapter]
    let paragraphDom = modelData.paragraphs.map((item, index) => (
      <li key={index}>
        <div className="item-hd">
          <p onClick={() => this.showTagEditor('title', index)}>{ this.getParaNum(index) + ' : ' + item.title }</p>
          <div className="item-tool">
            <div className="tool-icon"  onClick={() => this.showTagEditor('p', index)}>
              <img src={require('./images/text2.png')} alt="" />
            </div>
            <div className="tool-icon" onClick={() => this.showTagEditor('img', index)}>
              <img src={require('./images/pic.png')} alt="" />
            </div>
            <div className="tool-icon" onClick={() => this.showTagEditor('code', index)}>
              <img src={require('./images/code.png')} alt="" />
            </div>
            <div className="tool-icon" onClick={() => this.showTagEditor('a', index)}>
              <img src={require('./images/link.png')} alt="" />
            </div>
            <div className="tool-icon" onClick={() => this.exchangeParagraph(index, 'up')}>
              <img src={require('./images/up3.png')} alt="" />
            </div>
            <div className="tool-icon" onClick={() => this.exchangeParagraph(index, 'down')}>
              <img src={require('./images/down3.png')} alt="" />
            </div>
            <div className="tool-icon" onClick={() => this.removeParagraph(index)}>
              <img src={require('./images/1.png')} alt="" />
            </div>
          </div>
        </div>
        <div className="item-bd">
          <textarea type="textarea" className="ant-input" value={item.context} onClick={() => this.handlerChangeActiveParagraph(index)} onChange={e => this.handlerParagraphValChange(e, index)} ref={ activeChapter + ' ' + index }/>
        </div>
      </li>
    ))
    return (
      <div className="editor-paragraph-model">
        <div className="paragraph-hd">
          <Input placeholder="标题" size="large" ref="paragraphTitle" value={this.state.chapterList[this.state.activeChapter].title} onChange={e => this.setChapterTitle(e) }/>
          <div className="add" onClick={e => this.addParagraph(e)}><Icon type="plus-circle-o" />增加</div>
        </div>
        <div className="paragraph-wrapper">
          <ul className="paragraph-list">
            { paragraphDom }
          </ul>
        </div>
      </div>
    )
  }
}

export default reactMixin.onClass(CowEditor, {...initMixins, ...alertModelMixins, ...paraEventsMixins})
