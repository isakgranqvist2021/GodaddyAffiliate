import React from 'react';
import SliderComponent from '../Slider/SliderComponent';
import http from '../../Utils/http';
import './TemplateComponent.scss';

function TemplateComponent(props) {

    return (
        <div className="TemplateComponent">
            <SliderComponent images={props.images} />

            <div className="body">
                <h2>{props.title}</h2>
                <button onClick={() => props.pickTemplate(props._id)}>
                    <span>Pick Template</span>
                </button>
            </div>
        </div>
    );
}

export default TemplateComponent;