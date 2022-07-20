const anecdotes = [
  {
    id: 1,
    content: 'If it hurts, do it more often',
    votes: 0
  },
  {
    id: 2,
    content: 'Adding manpower to a late software project makes it later!',
    votes: 0
  },
  {
    id: 3,
    content: 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    votes: 0
  },
  {
    id: 4,
    content: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    votes: 0
  },
  {
    id: 5,
    content: 'Premature optimization is the root of all evil.',
    votes: 0
  },
  {
    id: 6,
    content: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    votes: 0
  },
  {
    id: 7,
    content: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    votes: 0
  }
]

const voteReducer = (store = anecdotes, action) => {
  const anecdotes = [...store]

  switch (action.type) {
    case 'ADD_VOTE':
      const id = action.data.id
      anecdotes.find(item => item.id === id).votes += 1
      return anecdotes
    default:
      return anecdotes
  }
}

export const addVote = (id) => {
  return {
    type: 'ADD_VOTE',
    data: { id }
  }
}

export default voteReducer