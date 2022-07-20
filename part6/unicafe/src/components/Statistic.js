import StatisticLine from './StatisticLine'

const Statistic = ({ feedback }) => {
  const list = ['good', 'neutral', 'bad'].map((item, index) => {
    return (
      <tr key={`fb_${index}`}>
        <td>{item}:</td>
        <td>{feedback[item]}</td>
      </tr>
    )
  })

  let all = 0
  Object.values(feedback).forEach(item => {if (typeof item === Number) all += item})
  const average = (all / 3).toFixed(2)
  const positive = feedback.good ? (feedback.good / all * 100).toFixed(2) + ' %' : '0 %'

  return (
    <div>
      <h1>statistics</h1>
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

export default Statistic