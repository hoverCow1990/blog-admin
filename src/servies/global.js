import React from 'react'
import 'antd/lib/button/style'
import 'antd/lib/icon/style'
import 'antd/lib/form/style'
import 'antd/lib/input/style'
import 'antd/lib/checkbox/style'
import 'antd/lib/menu/style'
import 'antd/lib/collapse/style'
import 'antd/lib/modal/style'
import 'antd/lib/message/style'
import 'antd/lib/select/style'
import 'antd/lib/checkbox/style'
import 'antd/lib/upload/style'
import 'antd/lib/pagination/style'
import 'antd/lib/table/style'
import '@/assets/css/reset.css'
import '@/assets/css/global.less'
import $Constant from '@/config/constant'
import $Http from './http.js'
import $Cookies from './cookies.js'
import $Lib from './lib.js'

React.Component.prototype.$Constant = $Constant
React.Component.prototype.$Http = $Http
React.Component.prototype.$Cookies = $Cookies
React.Component.prototype.$Lib = $Lib
