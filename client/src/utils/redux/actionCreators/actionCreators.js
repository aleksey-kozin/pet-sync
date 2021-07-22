import {
  CHECK_USERS,
  INIT_USERS,
  INIT_ANALYSES,
  INIT_FEED,
  INIT_PET,
  LOGOUT_USERS,
  EDIT_PET,
  EDIT_FEED,
  LIST_ANALYSES,
  INIT_ANALYSES_ID,
  INIT_ANALYSES_PEE,
  INIT_ANALYSES_PEE_LIST,
  INIT_ANALYSES_MONITOR,
  INIT_ANALYSES_MONITOR_LIST,
  EDIT_PET_IMG
} from '../actionTypes/actionTypes'

export function initUsersAC(payload) {
  return { type: INIT_USERS, payload }
}

export function logoutUsersAC(payload) {
  return { type: LOGOUT_USERS, payload }
}

export function initFeedAC(payload) {
  return { type: INIT_FEED, payload }
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

export function editPetAC(payload) {
  return { type: EDIT_PET, payload }
}

export function editFeedAC(payload) {
  return { type: EDIT_FEED, payload }
}

export function listAnalysesAC(payload) {
  return { type: LIST_ANALYSES, payload }
}

export function initAnalysesIdAC(payload) {
  return { type: INIT_ANALYSES_ID, payload }
}

export function initAnalysesPeeAC(payload) {
  return { type: INIT_ANALYSES_PEE, payload }
}

export function initAnalysesPeeListAC(payload) {
  return { type: INIT_ANALYSES_PEE_LIST, payload }
}

export function initAnalysesMonitorAC(payload) {
  return { type: INIT_ANALYSES_MONITOR, payload }
}

export function initAnalysesMonitorListAC(payload) {
  return { type: INIT_ANALYSES_MONITOR_LIST, payload }
}

export function editPetImgAC(payload) {
  return { type: EDIT_PET_IMG, payload }
}
