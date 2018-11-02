import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tab from './Tab';

export default class TabList extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
  }

  constructor(props) {
    super(props);
    this.refreshData = props.refreshData;
    this.state = {
      activeTab: this.props.children[0].props.label,
    };
  }

  onClickTabItem = (tab, period) => {

    this.setState({ activeTab: tab });

    this.refreshData(period);
  }

  render() {
    const { onClickTabItem, props: {children},state: {activeTab} } = this;

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
                return child.props.children;
                
            })}
            </div>
      </div>
    );
  }
}