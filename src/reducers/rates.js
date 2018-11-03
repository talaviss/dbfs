import { REQUEST_RATES_DATA_RECEIVED } from '../actiontypes/RatesActionTypes';

const initialState = {
  close: [],
  open: [],
  high: [],
  low: [],
  period: null,
  tab: null
};

export default function rates(state = initialState, action) {
  switch (action.type) {
  case REQUEST_RATES_DATA_RECEIVED:
  return Object.assign({}, state, {
    open: action.payload.open,
    close: action.payload.close,
    low: action.payload.low,
    high: action.payload.high,
    period: action.payload.period,  
    tab: action.payload.tab,
    timestamp: Date.now()
  });
  default:
    return state;
  }
}