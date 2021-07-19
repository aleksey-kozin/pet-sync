import {
  CHECK_USERS,
  INIT_USERS,
  INIT_ANALYSES,
  INIT_FEED,
  INIT_PET,
} from '../actionTypes/actionTypes'

export function initUsersAC(payload) {
  return { type: INIT_USERS, payload }
}

export function initFeedAC(payload) {
  return {type: INIT_FEED, payload}
}

export function checkUsersAC(payload) {
  return { type: CHECK_USERS, payload }
}

export function initAnalysesAC(payload) {
  return { type: INIT_ANALYSES, payload }

}

export function initPetAC(payload) {
  return { type: INIT_PET, payload }
}
