import React from 'react'
import ReactDOM from 'react-dom/client'
import feedbackReducer from './reducers/feedbackReducer'
import { createStore } from 'redux'

const store = createStore(feedbackReducer)

const Title = ({ text }) => <h1>{text}</h1>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}:</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistic = ({ feedback }) => {
  const keys = ['good', 'neutral', 'bad']

  const list = keys.map((item, index) => {
    return (
      <StatisticLine 
        key={`fb_${index}`} 
        text={item} 
        value={feedback[item]} 
      />
    )
  })

  let all = 0
  keys.forEach(item => all += feedback[item])
  const average = (all / 3).toFixed(2)
  const positive = feedback.good ? (feedback.good / all * 100).toFixed(2) + ' %' : '0 %'

  return (
    <div>
      <Title text='statistics' />
      {all === 0 && 
        <p>no feedback given</p>}
      {all > 0 && 
        <div>
          <table>
            <tbody>
              {list}
              <StatisticLine text='all' value={all} />
              <StatisticLine text='average' value={average} />
              <StatisticLine text='positive' value={positive} />
            </tbody>
          </table>
        </div>}     
    </div>
  )
}

const App = () => {
  const addGood = () => store.dispatch({ type: 'GOOD' })
  const addNeutral = () => store.dispatch({ type: 'NEUTRAL' })
  const addBad = () => store.dispatch({ type: 'BAD' })

  return (
    <div>
      <Title text='give feedback' />
      <Button onClick={() => addGood()} text='good' />
      <Button onClick={() => addNeutral()} text='neutral' />
      <Button onClick={() => addBad()} text='bad' />
      <Statistic feedback={store.getState()} />
    </div>
  )
}

const container = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => container.render(<App />)

renderApp()
store.subscribe(renderApp)