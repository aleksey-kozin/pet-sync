import { CHECK_USERS, INIT_USERS } from '../actionTypes/actionTypes'

export function initUsersAC(payload) {
  return { type: INIT_USERS, payload }
}

export function checkUsersAC(payload) {
  return { type: CHECK_USERS, payload }
}
