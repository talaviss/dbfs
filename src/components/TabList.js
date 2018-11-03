import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import Tab from './Tab';
import Highcharts from 'highcharts/highstock'

export default class TabList extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
  }

  constructor(props) {
    super(props);
 
    this.onRefreshData = this.onRefreshData.bind(this);
    this.getOptions = this.getOptions.bind(this);
    this.state = {
      activeTab: this.props.children[0].props.label,
    };
    //this.onRefreshData('MIN_1');
  }

  onClickTabItem = (tab, period) => {
    console.log('aaa')
    this.setState({ activeTab: tab });
    this.onRefreshData(period);
  }

  componentDidMount(){
    //this.onRefreshData('MIN_1');
  }

  getOptions(){

    if(!this.state.chartsData){
        return [];
    }
    const options = {
        title: {
          text: 'EUR/USD Exchange rates'
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
              fontSize: '8px'
          }
        },
        tooltip: {
          xDateFormat: '%Y-%m-%d %H:%M',
          shared: true
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
    
    return options;

}  



onRefreshData(period){
    //console.log(period)
    function sort(arr){
        arr.sort((a,b) => (a[0] > b[0]) ? 1 : (b[0] > a[0] ? -1 : 0));
    }
    const url = `https://www.fxempire.com/api/v1/en/markets/eur-usd/chart?time=${period}`;
    console.log(url);
    Axios.get(url)
    .then(response => {
    
        let chartsData = {}
        chartsData.open = response.data.map((info) => { 
            return [ info.date,  info.low];
        })
        chartsData.close = response.data.map((info) => { 
            let arr = [info.date, info.high];
            return arr;
        })
        chartsData.high = response.data.map((info) => { 
            return [ info.date,  info.open];
        })
        chartsData.low = response.data.map((info) => { 
            return [ info.date,  info.close];
        })
   
        sort(chartsData.low); 
        sort(chartsData.high);  
        sort(chartsData.open); 
        sort(chartsData.close);  
  
        this.setState({
            chartsData 
        })
        console.log('after')

       
    })
    .catch(error => {
        console.error(error);
    })
}


  render() {
    const { onClickTabItem, props: {children},state: {activeTab} } = this;
    const options = this.getOptions();
    console.log('render')
    //console.log(options)
    return (
        <div>
            <nav>
            <div className="nav nav-pills">
                {children.map((child) => {
                const { label, period } = child.props;
    
                return (
                    <Tab
                    activeTab={activeTab}
                    period={period}
                    key={label}
                    label={label}
                    onClick={onClickTabItem}
                    />
                );
                })}
            </div>
            </nav>
            <div className="tab-content">
            {children.map((child) => {
                if (child.props.label !== activeTab) return undefined;
               // if(child.props.children.props.options)
               Object.assign(child.props.children.props.options,options)
                
                return child.props.children;
                
            })}
            </div>
      </div>
    );
  }
}