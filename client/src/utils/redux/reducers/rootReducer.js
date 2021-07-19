import { combineReducers } from 'redux'

import usersReducer from './usersReducer'
import feedReducer from './feedReducer'

const rootReducer = combineReducers({
  usersReducer,
  feedReducer,
})

export default rootReducer
