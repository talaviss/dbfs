import Axios from 'axios';
import { REQUEST_RATES_DATA_RECEIVED } from '../actiontypes/RatesActionTypes';

function fetchExchangeRates(dispatch, period, tab) {
  const url = `https://www.fxempire.com/api/v1/en/markets/eur-usd/chart?time=${period}`;
  console.log(url);
  return Axios.get(url)
    .then(response => {
      let ratesData = {
        period,
        tab
      };
      ratesData.open = response.data.map(info => {
        return [info.date, info.low];
      });
      ratesData.close = response.data.map(info => {
        let arr = [info.date, info.high];
        return arr;
      });
      ratesData.high = response.data.map(info => {
        return [info.date, info.open];
      });
      ratesData.low = response.data.map(info => {
        return [info.date, info.close];
      });
      function sort(arr) {
        arr.sort((a, b) => (a[0] > b[0] ? 1 : b[0] > a[0] ? -1 : 0));
      }
      sort(ratesData.low);
      sort(ratesData.high);
      sort(ratesData.open);
      sort(ratesData.close);

      return dispatch(requestRatesReceived(ratesData));
    })
    .catch(error => {
      console.error(error);
    });
}


function requestRatesReceived(data) {
  return {
    type: REQUEST_RATES_DATA_RECEIVED,
    payload: data
  };
}



export function requestRatesWithPeriod(period, tab) {
  return function inner(dispatch) {

    return fetchExchangeRates(dispatch, period, tab);
  };
}