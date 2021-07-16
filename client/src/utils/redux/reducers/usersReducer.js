import { INIT_USERS } from '../actionTypes/actionTypes'

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case INIT_USERS:
      return { ...state }

    default:
      return state
  }
}

export default usersReducer
