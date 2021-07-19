import { INIT_FEED, INIT_USERS } from '../actionTypes/actionTypes'

export function initUsersAC(payload) {
  return { type: INIT_USERS, payload }
}

export function initFeedAC(payload) {
  return {type: INIT_FEED, payload}
}
