import { CHECK_USERS, INIT_USERS } from '../actionTypes/actionTypes'

const initialStateAuth = {
  user: {},
  isAuth: false,
  isLoading: false,
}

const usersReducer = (state = initialStateAuth, action) => {
  switch (action.type) {
    case INIT_USERS:
      return { ...state, user: action.payload, isAuth: true }

    case CHECK_USERS:
      // console.log(action.payload);
      return { ...state, user: action.payload, isAuth: true, isLoading: true }

    default:
      return state
  }
}

export default usersReducer
