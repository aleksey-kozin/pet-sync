import { INIT_PET, EDIT_PET } from '../actionTypes/actionTypes'

const petsReducer = (state = {}, action) => {
  switch (action.type) {
    case INIT_PET:
      console.log(action.payload);
      return { ...state, pet: action.payload }
    
    case EDIT_PET:
      console.log(action.payload);
      console.log(state)
      const newArr = [...state.pet]
      const pet = newArr.find((el) => el._id === action.payload.id)
      pet.name = action.payload.name
      pet.spacies = action.payload.spacies
      pet.breed = action.payload.breed
      pet.sex = action.payload.sex
      pet.weight = action.payload.weight
      pet.birthdate = action.payload.birthdate
      // console.log(newArr)
      return {...state, pet: newArr}
    default:
      return state
  }
}

export default petsReducer
