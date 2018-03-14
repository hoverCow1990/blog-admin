const Coders = {
  // 处理code类型改变
  handleCodeTypeChange (val) {
    this.setState({
      codeType: val
    })
  },

  // 处理code标签的确定
  handlerCodeval () {
    const val = this.refs.textarea.value
    const codeType = this.state.codeType
    let value = this.getCode(codeType, val)

    this.props.submitTagEditor({
      type: 'code',
      value
    })
    this.refs.textarea.value = ''
  },

  // js分行
  getCode (codeType, val) {
    let count = 0
    let code
    let context = val.replace(/[^\n]+/g, $0 => {
      switch (codeType) {
        case 'javascript':
          code = this.getJsCode($0)
          break
        case 'css':
          code = this.getCssCode($0)
          break
        case 'html':
          code = this.getHtmlCode($0)
          break
        default:
          break
      }
      count++
      return `
        <li>
          <div class="count">${count}</div>
          <div class="content">
            <code>${code}</code>
          </div>
        </li>`
    })
    return `<div class="cow-code">
              <ul>
                ${context}
              </ul>
            </div>`
  },

  // 处理html细节代码
  getHtmlCode (code) {
    return code
      .replace(/(<|>)/g, $0 => {
        let sym = ''
        if ($0 === '<') return '&lt'
        if ($0 === '>') return '&gt'
        return sym
      })
      .replace(/(class|id|type|href|alt|src|placeholder|data-\w+)=/g, ($0, $1) => {
        return '<code class="green">' + $1 + '</code>='
      })
      .replace(/(&lt|\/)(nav|div|button|li|ul|i|img|a|fotter|span|p|html|body|document|input|label|form|script|style)(\s|&gt)/g, ($0, $1, $2, $3) => {
        return $1 + '<code class="red">' + $2 + '</code>' + $3
      })
      .replace(/^\s+/, $0 => {
        return '&nbsp;'.repeat($0.length)
      })
  },

  // 处理css细节代码
  getCssCode (code) {
    return code
      .replace(/^(\s+)([^:]+):/g, ($0, $1, $2) => {
        return $1 + '<code class="blue">' + $2 + '</code>:'
      })
      .replace(/(screen|max-width|min-width)/g, ($0, $1) => {
        return '<code class="blue">' + $1 + '</code>'
      })
      .replace(/(&?)(\.|#)([\w-]+)(\s?\{)/g, ($0, $1, $2, $3, $4) => {
        return '<code class="green">' + $1 + $2 + $3 + '</code>' + $4
      })
      .replace(/(@media|\sand\s|nth-child|last-child|first-child)/g, ($0, $1) => {
        return '<code class="red">' + $1 + '</code>'
      })
      .replace(/(button|i|a|div|img|p|ul|li|ol|nav|fotter|span|body|html|input|form|document|label)(\s?{)/g, ($0, $1, $2) => {
        return '<code class="red">' + $1 + '</code>' + $2
      })
      .replace(/(\d+)(px|%|rem|s)/g, ($0, $1, $2) => {
        return $1 + '<code class="red">' + $2 + '</code>'
      })
      .replace(/(\/\/\s.+)/g, ($0, $1, $2) => {
        return '<code class="grey">' + $1 + '</code>'
      })
      .replace(/\W\d+/g, $0 => {
        var word = $0.match(/\d+/)[0]
        var beforeSymbol = $0.match(/^\W/)
        var before = beforeSymbol ? beforeSymbol[0] : ''
        if (before === '-' || before === '.') return '<code class="violet">' + $0 + '</code>'
        return before + '<code class="violet">' + word + '</code>'
      })
      .replace(/#[\da-zA-Z]{3,6}/g, $0 => {
        return '<code class="violet">' + $0 + '</code>'
      })
      .replace(/^\s+/, $0 => {
        return '&nbsp;'.repeat($0.length)
      })
  },

  // 处理js细节代码
  getJsCode (code) {
    return code
      .replace(/("([^\\"\n]|\\.)*?"|'([^\\'\n]|\\.)*?'|`([^\\`\n]|\\.)*?`|\/[\s]+\/)/g, $0 => {
        let word = $0.match(/('|"|\/|`).+/)[0]
        let beforeSymbol = $0.match(/^(\s|\[|\(|,|:|\?|\+)+/)
        let before = beforeSymbol ? beforeSymbol[0] : ''
        return before + '<code class="yellow">' + word + '</code>'
      })
      .replace(/<(.{1,4})/g, ($0, $1) => {
        if (/code/.test($1) || /^<\/cod/.test($0)) return $0
        return '<code class="red"><</code>' + $1
      })
      .replace(/(.{1,4})>/g, ($0, $1) => {
        if (/code/.test($1) || /"$/.test($1)) return $0
        return $1 + '<code class="red">></code>'
      })
      .replace(/((const|var|let|class|extends)\s|function(\s|\()|(JSON|Math|Array|Symbol|Object)\.|\.(test|search|href|floor|ceil|sort|substring|substr|every|some|filter|toString|toLocaleString|shift|splice|callee|caller|length|replace|addEventListener|removeEventListener|apply|slice|split|call|bind|apply|push|pop|unshift|concat|forEach|map|reduce|some|join|add|random|prototype|__proto__|getElementById|getElementsByClassName|getElementsByTagName|getElementById|queryselectorAll|hasOwnProperty|match|assign|ajax|repeat|padStart|padEnd|indexOf)|document|window|solve|reject|resolve|Date|RegExp|Number|Array|Object|Function|String|Boolean|addClass|removeClass|setTimeout)/g, $0 => {
        var word = $0.match(/\w+/)[0]
        var beforeSymbol = $0.match(/^\W/)
        var afterSymbol = $0.match(/\W$/)
        var before = beforeSymbol ? beforeSymbol[0] : ''
        var after = afterSymbol ? afterSymbol[0] : ''
        return before + '<code class="blue">' + word + '</code>' + after
      })
      .replace(/((if|for|super)(\s|\()|else(\s|\{)|(return|break)(\s|;)|(export|new|continue|default|delete|throw|while|typeof|switch|try|instanceof|with|catch|import|case|break)\s|this(\.|\s))/g, $0 => {
        var word = $0.match(/\w+/)[0]
        var symbol = $0.match(/\W/)[0] || ''
        return '<code class="red">' + word + '</code>' + symbol
      })
      .replace(/(\/\/.+|\/\*.?)$/, $0 => {
        return '<code class="grey">' + $0 + '</code>'
      })
      .replace(/^(\s?\*|\s\*\/).+$/, $0 => {
        return '<code class="grey">' + $0 + '</code>'
      })
      .replace(/(\s(\$|=>|>=|!==|<=|%|\*|\+|-|\/|\||\|\||&|&&|\?|:|in|do)\s|((\+|-){2})|\s={1,3}|\$|arguments|constructor)/g, $0 => {
        return '<code class="red">' + $0 + '</code>'
      })
      .replace(/(null|undefined|true|false|void)/g, $0 => {
        return '<code class="violet">' + $0 + '</code>'
      })
      .replace(/\W\d+/g, $0 => {
        var word = $0.match(/\d+/)[0]
        var beforeSymbol = $0.match(/^\W/)
        var before = beforeSymbol ? beforeSymbol[0] : ''
        if (before === '-') return '<code class="violet">' + $0 + '</code>'
        return before + '<code class="violet">' + word + '</code>'
      })
      .replace(/^\s+/, $0 => {
        return '&nbsp;'.repeat($0.length)
      })
  }
}

export default Coders
