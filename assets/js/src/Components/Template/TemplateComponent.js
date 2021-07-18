import React from 'react';
import './TemplateComponent.scss';

function TemplateComponent(props) {

    return (
        <div className="card">
            <img src={props.images[0]} className="card-img-top" alt="" />

            <div className="card-body">
                <h5 className="card-title d-flex justify-content-between">
                    {props.title} <span>{props.curr !== null ? props.curr.code : 'EUR'} {props.price}</span>
                </h5>
                <p className="card-text">{props.description.substring(0, 100)}</p>
                <a onClick={() => props.pickTemplate(props._id)} className="btn btn-primary">Pick Template</a>
            </div>
        </div>

    );
}

export default TemplateComponent;