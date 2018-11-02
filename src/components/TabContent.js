import React, { Component } from 'react';

import '../App.css';
import TabList from './TabList';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export default class TabContent extends Component {
    render() {
        const options = {
            title: {
              text: 'My chart'
            },
            series: [{
              data: [1, 2, 3]
            }]
          }
     
        return (
                <div className="container up">
                     <TabList>
                        <div period="1_MIN" label="One Minute" className="tab-content">
                            <HighchartsReact
                            highcharts={Highcharts}
                            options={options}/>
                        </div>
                        <div period="5_MIN" label="Five Minute" className="tab-content">
                         
                        </div>
                        <div period="1_HOUR" label="One Hour" className="tab-content">
                          
                        </div>
                        <div period="1_WEEK" label="One Week" className="tab-content">
                       
                        </div>
                    </TabList>
                </div>
        );
    }
}