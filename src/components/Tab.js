import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'


export default class Tab extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  componentDidMount(){

    const { period } = this.props;
    //console.log(period);
    Axios.get(`https://www.fxempire.com/api/v1/en/markets/eur-usd/chart?time=${period}`)
        .then(response => {
            let chartsData = {}
            chartsData.open = response.data.flatMap((info) => { 
              return info.open;
            })
            chartsData.close = response.data.flatMap((info) => { 
              return info.close;
            })
            chartsData.high = response.data.flatMap((info) => { 
              return info.high;
            })
            chartsData.low = response.data.flatMap((info) => { 
              return info.low;
            })
         
            this.setState({
              chartsData
            })
        })
        .catch(error => {
            console.error(error);
        })
  }



  onClick = () => {
    const { label, onClick } = this.props;
    onClick(label);
  }

  render() {
    const { onClick, props: { activeTab, label }} = this;
    const options = {
      title: {
        text: 'My map chart'
      },
      series: [{
        name: 'open',
        data: this.state ? this.state.chartsData.open : []
      },
      {
        name: 'close',
        data: this.state ? this.state.chartsData.close : []
      },
      {
        name: 'high',
        data: this.state ? this.state.chartsData.high : []
      },
      {
        name: 'low',
        data: this.state ? this.state.chartsData.low : []
      }]
    }
    let className = 'nav-item nav-link';

    if (activeTab === label) {
      className += ' active';
    }

    return (
     
      <div>
        // eslint-disable-next-line
        <a href="#" className={className} onClick={onClick}>
          {label}
        </a>
       <HighchartsReact
       highcharts={Highcharts}
       options={options}
     /></div>
     
    );
  }
}