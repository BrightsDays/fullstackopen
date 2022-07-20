import React from 'react'
import ReactDOM from 'react-dom/client'
import feedbackReducer from './reducers/feedbackReducer'
import { createStore } from 'redux'
import App from './App'

const store = createStore(feedbackReducer)

const container = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => container.render(<App store={store} />)

renderApp()
store.subscribe(renderApp)