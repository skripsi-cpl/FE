import React from 'react';
import PropTypes from 'prop-types';
import './DataComponent.css';

const DataComponent = ({ title, number }) => {

    return (
        <div className='card-component'>
            <div className='card-title' >{title}</div>
            <div className='card-number'>{number}</div>
        </div>
    );
};

DataComponent.propTypes = {
    title: PropTypes.string.isRequired,
    number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default DataComponent;
