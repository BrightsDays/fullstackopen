import feedbackReducer from './feedbackReducer'
import deepFreeze from 'deep-freeze'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    neutral: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = feedbackReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('don\'t change origin state', () => {
    const state = {}
    const action = {
      type: 'GOOD',
      data: {}
    }

    deepFreeze(state)
    const newState = feedbackReducer(state, action)

    expect(newState).not.toEqual(state)
  })

  test('actions incremented', () => {
    const actions = ['good', 'neutral', 'bad']

    actions.forEach(item => {
      const action = { type: item.toUpperCase() }
      const state = initialState
    
      deepFreeze(state)
      const newState = feedbackReducer(state, action)
      expect(newState[item]).toEqual(1)
    })
  })
})