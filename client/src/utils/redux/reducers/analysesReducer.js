import {
  INIT_ANALYSES,
  INIT_ANALYSES_ID,
  INIT_ANALYSES_MONITOR,
  INIT_ANALYSES_MONITOR_LIST,
  INIT_ANALYSES_PEE,
  INIT_ANALYSES_PEE_LIST,
  LIST_ANALYSES,
} from '../actionTypes/actionTypes'


const analysesReducer = (
  state = {
    analyses: [],
    listAnalyses: [],
    analysesID: [],
    analysesPee: [],
    PeeListAnalyses: [],
    analysesMonitor: [],
    monitorListAnalyses: [],
  },
  action
) => {
  switch (action.type) {
    case INIT_ANALYSES:
      return { ...state, analyses: action.payload }
    case LIST_ANALYSES:
      return { ...state, listAnalyses: action.payload }
    case INIT_ANALYSES_ID:
      return { ...state, analysesID: action.payload }
    case INIT_ANALYSES_PEE:
      return { ...state, analysesPee: action.payload }
    case INIT_ANALYSES_PEE_LIST:
      return { ...state, PeeListAnalyses: action.payload }
    case INIT_ANALYSES_MONITOR:
        return { ...state, analysesMonitor: action.payload }
    case INIT_ANALYSES_MONITOR_LIST:
      return { ...state, monitorListAnalyses: action.payload }

    default:
      return state
  }
}

export default analysesReducer
