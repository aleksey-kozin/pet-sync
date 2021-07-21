import { INIT_ANALYSES, LIST_ANALYSES } from '../actionTypes/actionTypes'

// const initialStateAuth = {
//   user: {},
//   isAuth: false,
//   isLoading: false,
// }

const analysesReducer = (
  state = { analyses: [], listAnalyses: [] },
  action
) => {
  switch (action.type) {
    case INIT_ANALYSES:
      return { ...state, analyses: action.payload }
    case LIST_ANALYSES:
      return { ...state, listAnalyses: action.payload }

    default:
      return state
  }
}

export default analysesReducer
