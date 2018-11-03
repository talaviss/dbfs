import React, { Component } from 'react';

import '../App.css';
import TabList from './TabList';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
export default class TabContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        timestamp: Date.now(),
      },
    };
    this.onUpdateChart = this.onUpdateChart.bind(this);
  }

  onUpdateChart(options) {
    if (options.timestamp > this.state.options.timestamp) {
      this.setState({
        options: options,
      });
    }
  }

  render() {
    return (
      <div className="container up">
        <div className="head-title">FX Empire Media rates online</div>
        <TabList>
          <div period="MIN_1" label="1 minute" className="tab-content">
            <HighchartsReact
              highcharts={Highcharts}
              options={this.state.options}
              onUpdate={this.onUpdateChart}
            />
          </div>
          <div period="MIN_5" label="5 minutes" className="tab-content">
            <HighchartsReact
              highcharts={Highcharts}
              options={this.state.options}
              onUpdate={this.onUpdateChart}
            />
          </div>
          <div period="HOUR_1" label="1 hour" className="tab-content">
            <HighchartsReact
              highcharts={Highcharts}
              options={this.state.options}
              onUpdate={this.onUpdateChart}
            />
          </div>
          <div period="WEEK_1" label="1 week" className="tab-content">
            <HighchartsReact
              highcharts={Highcharts}
              options={this.state.options}
              onUpdate={this.onUpdateChart}
            />
          </div>
        </TabList>
      </div>
    );
  }
}
