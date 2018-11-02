import React, { Component } from 'react';

import '../App.css';
import TabList from './TabList';
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import Axios from 'axios';


export default class TabContent extends Component {
    constructor(){
        super();
        this.state = {}
    };
    componentDidMount(){
        this.onRefreshData('1_MIN')

        console.log('tab content componentDidMount');
       
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
                tickInterval: 1
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
        console.log(period)
        Axios.get(`https://www.fxempire.com/api/v1/en/markets/eur-usd/chart?time=${period}`)
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
            console.log(chartsData)
           
            this.setState({
              chartsData
            })
           
        })
        .catch(error => {
            console.error(error);
        })
    }


    render() {
        console.log('render');
        var options = this.getOptions();
        
        return (
                <div className="container up">
                     <TabList refreshData={this.onRefreshData}>
                        <div period="1_MIN" label="1 minute" className="tab-content">
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={options}
                                />
                        </div>
                        <div period="5_MIN" label="5 minutes" className="tab-content">
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={options}
                                />
                        </div>
                        <div period="1_HOUR" label="1 hour" className="tab-content">
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={options}
                                />
                        </div>
                        <div period="1_WEEK" label="1 week" className="tab-content">
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={options}
                                />
                        </div>
                    </TabList>
                </div>
        );
    }
}