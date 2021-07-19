import { INIT_ANALYSES } from '../actionTypes/actionTypes'

// const initialStateAuth = {
//   user: {},
//   isAuth: false,
//   isLoading: false,
// }

const analysesReducer = (state = { analyses: [] }, action) => {
  switch (action.type) {
    case INIT_ANALYSES:
      return { ...state, analyses: action.payload }

    default:
      return state
  }
}

export default analysesReducer
