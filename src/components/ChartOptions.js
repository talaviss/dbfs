import Highcharts from 'highcharts/highstock';
export function getOptions(rates) {
    if (!rates) {
      return [];
    }
    const options = {
      title: {
        text: 'EUR/USD Exchange rates',
      },
      xAxis: {
        type: 'datetime',
        labels: {
          formatter: function() {
            return Highcharts.dateFormat('%a %e %b - %H %M %S', this.value);
          },
        },
        tickInterval: 1,
        style: {
          fontSize: '8px',
        },
      },
      tooltip: {
        xDateFormat: '%Y-%m-%d %H:%M',
        shared: true,
      },
      series: [
        {
          name: 'open',
          data: rates.open ,
        },
        {
          name: 'close',
          data: rates.close ,
        },
        {
          name: 'high',
          data: rates.high,
        },
        {
          name: 'low',
          data: rates.low,
        },
      ],
    };
    return options;
  }