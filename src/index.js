import React from 'react'
import ReactDOM from 'react-dom'
import App from './views/main/app'
import '@/servies/global.js'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
