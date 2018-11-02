import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';

export default class Tab extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  componentDidMount(){

    const { period } = this.props;
    console.log(period);
    Axios.get(`https://www.fxempire.com/api/v1/en/markets/eur-usd/chart?time=${period}`)
        .then(response => {
            let chartsData = response.data;
            this.setState({
                data: chartsData
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

    let className = 'nav-item nav-link';

    if (activeTab === label) {
      className += ' active';
    }

    return (
      // eslint-disable-next-line
      <a href="#" className={className} onClick={onClick}>
        {label}
      </a>
    );
  }
}