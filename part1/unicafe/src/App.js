import { useState } from 'react'
import './app.css'

const Title = ({ title }) => <h1>{title}</h1>
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
  const list = Object.keys(feedback).map((item, index) => {
    return (
      <StatisticLine 
        key={`fb_${index}`} 
        text={item} 
        value={feedback[item]} 
      />
    )
  });

  const all = Object.values(feedback).reduce((a, b) => a + b)
  const average = (all / 3).toFixed(2)
  const positive = feedback.good ? (feedback.good / all * 100).toFixed(2) + ' %' : '0 %'

  return (
    <div>
      <Title title='statistics' />
      {all === 0 && 
        <p>no feedback given</p>}
      {all > 0 && 
        <table className='list'>
          {list}
          <StatisticLine text='all' value={all} />
          <StatisticLine text='average' value={average} />
          <StatisticLine text='positive' value={positive} />
        </table>}     
    </div>
  )
}

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  })

  const addGood = () => () => setFeedback({...feedback, good: feedback.good + 1})
  const addNeutral = () => () => setFeedback({...feedback, neutral: feedback.neutral + 1})
  const addBad = () => () => setFeedback({...feedback, bad: feedback.bad + 1})

  return (
    <div>
      <Title title='give feedback' />
      <Button onClick={addGood()} text='good' />
      <Button onClick={addNeutral()} text='neutral' />
      <Button onClick={addBad()} text='bad' />
      <Statistic feedback={feedback} />
    </div>
  )
}

export default App