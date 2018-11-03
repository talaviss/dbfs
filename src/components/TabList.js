import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';
import { getOptions } from './ChartOptions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as RatesActions from '../actions/RatesActions';

export class TabList extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
  };

  constructor(props) {
    super(props);

    this.onClickTabItem = this.onClickTabItem.bind(this);
  }

  onClickTabItem = (tab, period) => {
    this.props.actions.requestRatesWithPeriod(period, tab);
  };

  componentDidMount() {
    this.props.actions.requestRatesWithPeriod('MIN_1');
  }

  render() {
    const {
      onClickTabItem,
      props: { children },
    } = this;

    let activeTab = this.props.rates.tab || this.props.children[0].props.label;
    const options = getOptions(this.props.rates);
    return (
      <div>
        <nav>
          <div className="nav nav-pills">
            {children.map(child => {
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
          {children.map(child => {
            if (child.props.label !== activeTab) return undefined;
            child.props.children.props.onUpdate(options);
            return child.props.children;
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    rates: state.rates,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(RatesActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TabList);
