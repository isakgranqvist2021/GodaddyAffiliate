import React from 'react';
import './PlaceholderComponent.scss';

function PlaceholderComponent(props) {
    return (
        <div className="PlaceholderComponent">
            <div className="placeholder">
                <span className="placeholder-image"></span>
                <span className="placeholder-title"></span>
                <span className="placeholder-paragraph"></span>
                <span className="placeholder-paragraph"></span>
                <span className="placeholder-paragraph"></span>
            </div>
        </div>
    )
}

export default PlaceholderComponent;