import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App/App'
import { Provider } from 'react-redux'
import store from '../src/utils/redux/store'


ReactDOM.render(<App />, document.getElementById('root'))
