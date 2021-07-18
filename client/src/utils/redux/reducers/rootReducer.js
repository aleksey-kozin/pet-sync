import { combineReducers } from 'redux'
import usersReducer from './usersReducer'
import analysesReducer from './analysesReducer'

const rootReducer = combineReducers({
  usersReducer,
  analysesReducer,
})

export default rootReducer
