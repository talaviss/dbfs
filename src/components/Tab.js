import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class Tab extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };


  onClick = () => {
    const { label, period, onClick } = this.props;
    onClick(label, period);
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
          {label}</a>
 
     
    );
  }
}