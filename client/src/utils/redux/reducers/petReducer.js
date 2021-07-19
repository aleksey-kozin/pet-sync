import { INIT_PET } from '../actionTypes/actionTypes'

const petsReducer = (state = {}, action) => {
  switch (action.type) {
    case INIT_PET:
      console.log(action.payload);
      return { ...state, pet: action.payload }

    default:
      return state
  }
}

export default petsReducer
