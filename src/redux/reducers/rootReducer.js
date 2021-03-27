import { combineReducers } from "redux";
import NewsPortalReducer from "./index";


const appReducer = combineReducers({
  NewsPortalList: NewsPortalReducer
})

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }
  return appReducer(state, action)
}
export default rootReducer
