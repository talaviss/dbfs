import React, { Component } from 'react';

import '../App.css';
import TabList from './TabList';
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'



export default class TabContent extends Component {
    constructor(){
        super();
        this.state = {
            
        }
   
       
    };
 


    render() {

        var options = {}
        
        return (
                <div className="container up">
                     <TabList >
                        <div period="MIN_1" label="1 minute" className="tab-content">
                            <HighchartsReact
                           
                                highcharts={Highcharts}
                                options={options}
                                />
                        </div>
                        <div period="MIN_5" label="5 minutes" className="tab-content">
                            <HighchartsReact
                            
                                highcharts={Highcharts}
                                options={options}
                                />
                        </div>
                        <div period="HOUR_1" label="1 hour" className="tab-content">
                            <HighchartsReact
                           
                                highcharts={Highcharts}
                                options={options}
                                />
                        </div>
                        <div period="WEEK_1" label="1 week" className="tab-content">
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