import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { TransactionProvider } from "./context/Context";
import App from './App'

ReactDOM.render(
    <TransactionProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </TransactionProvider>,
    document.getElementById('root')
)
