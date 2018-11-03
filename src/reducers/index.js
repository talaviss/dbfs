import { combineReducers } from 'redux'
import RatesReducer from './rates'
export default combineReducers({
  rates: RatesReducer
})
