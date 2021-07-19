import { combineReducers } from 'redux'

import usersReducer from './usersReducer'
import feedReducer from './feedReducer'
import analysesReducer from './analysesReducer'

const rootReducer = combineReducers({
  usersReducer,
  analysesReducer,
  feedReducer,
})

export default rootReducer
