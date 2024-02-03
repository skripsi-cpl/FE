import React from 'react';
import PropTypes from 'prop-types';

const DataComponent = ({ title, number, color, borderColor, borderRadius, width, height, backgroundColor }) => {
    const cardStyle = {
        border: `2px solid ${borderColor || color}`,
        borderRadius: `${borderRadius}`,
        padding: '20px',
        marginBottom: '20px',
        width: `${width || '200px'}`,
        height: `${height || 'auto'}`,
        textAlign: 'center',
        backgroundColor: `${backgroundColor || '#fff'}`,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'box-shadow 0.3s ease-in-out',
    };

    const titleStyle = {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '10px',
        color: '#2c3e50',
    };

    const numberStyle = {
        fontSize: '15px',
        color: '#34495e',
        fontWeight: 'bold',

    };

    return (
        <div style={cardStyle}>
            <div style={titleStyle}>{title}</div>
            <div style={numberStyle}>{number}</div>
        </div>
    );
};

DataComponent.propTypes = {
    title: PropTypes.string.isRequired,
    number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    color: PropTypes.string,
    borderColor: PropTypes.string,
    borderRadius: PropTypes.string,
    width: PropTypes.string,
};

export default DataComponent;
