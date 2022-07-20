const initialState = {
  good: 0,
  neutral: 0,
  bad: 0
}

const feedbackReducer = (state = initialState, action) => {
  const feedback = {...state}

  switch (action.type) {
    case 'GOOD':
      feedback.good += 1
      return feedback
    case 'NEUTRAL':
      feedback.neutral += 1
      return feedback
    case 'BAD':
      feedback.bad += 1
      return feedback
    default:
      return feedback
  }
}

export const addFeedback = type => { return { type: type } }

export default feedbackReducer