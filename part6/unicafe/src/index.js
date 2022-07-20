import React from 'react'
import ReactDOM from 'react-dom/client'
import feedbackReducer from './reducers/feedbackReducer'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'

const store = createStore(feedbackReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)