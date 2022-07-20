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
  const list = ['good', 'neutral', 'bad'].map((item, index) => {
    return (
      <StatisticLine 
        key={`fb_${index}`} 
        text={item} 
        value={feedback[item]} 
      />
    )
  });

  let all = 0
  Object.values(feedback).forEach(item => {if (typeof item === Number) all += item})
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

const App = ({ store }) => {
  const addGood = () => store.dispatch({ type: 'good' })
  const addNeutral = () => store.dispatch({ type: 'neutral' })
  const addBad = () => store.dispatch({ type: 'bad' })

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

export default App