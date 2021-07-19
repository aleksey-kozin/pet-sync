import { INIT_FEED } from '../actionTypes/actionTypes'

const feedReducer = (state = {feed: []}, action) => {
switch (action.type) {
  case INIT_FEED:
    return { ...state, feed: action.payload };
  default:
    return state;
}
}

export default feedReducer
