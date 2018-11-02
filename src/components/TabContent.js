import React, { Component } from 'react';

import '../App.css';
import TabList from './TabList';


export default class TabContent extends Component {
    render() {
      
     
        return (
                <div className="container up">
                     <TabList>
                        <div period="1_MIN" label="1 minute" className="tab-content">
                           
                        </div>
                        <div period="5_MIN" label="5 minutes" className="tab-content">
                         
                        </div>
                        <div period="1_HOUR" label="1 hour" className="tab-content">
                          
                        </div>
                        <div period="1_WEEK" label="1 week" className="tab-content">
                       
                        </div>
                    </TabList>
                </div>
        );
    }
}