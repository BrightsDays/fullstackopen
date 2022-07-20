const Anecdote = ({ content, points }) => {
  return (
    <div>
      <p>{content}</p>
      <p>has {points} votes</p>
    </div>
  )
}

export default Anecdote