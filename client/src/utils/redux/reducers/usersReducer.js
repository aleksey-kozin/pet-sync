import { INIT_USERS } from '../actionTypes/actionTypes'

const initialStateAuth = {
  user: {},
  isAuth: false,
  isLoading: false,
}

const usersReducer = (state = initialStateAuth, action) => {
  switch (action.type) {
    case INIT_USERS:
      return { ...state }

    default:
      return state
  }
}

export default usersReducer
