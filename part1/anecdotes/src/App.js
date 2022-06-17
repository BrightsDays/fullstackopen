import { useState } from 'react'

const Title = ({ text }) => <h1>{text}</h1>
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Anecdote = ({ content, points }) => {
  return (
    <div>
      <p>{content}</p>
      <p>has {points} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  const [popularIndex, setPopularIndex] = useState(0)

  const randomAnecdote = () => () => {
    let random = 0

    do {
      random = Math.floor(Math.random() * anecdotes.length)
    } while (random === selected)

    setSelected(random)
  }

  const voteForAnecdote = () => () => {
    let clone = [...points]
    clone[selected] += 1

    setPoints(clone)
    setPopularIndex(clone.indexOf(Math.max(...clone)))
  }

  return (
    <div>
      <Title text='Anecdote of the day' />
      <Anecdote content={anecdotes[selected]} points={points[selected]} />
      <Button text='vote' onClick={voteForAnecdote()} />
      <Button text='next anecdote' onClick={randomAnecdote()} />
      
      {Math.max(...points) !== 0 &&
        <>
          <Title text='Anecdote with most votes' />
          <Anecdote 
            content={anecdotes[popularIndex]} 
            points={points[popularIndex]} 
          />
        </>}
    </div>
  )
}

export default App