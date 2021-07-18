import React from 'react';
import './TemplateComponent.scss';

function TemplateComponent(props) {

    return (
        <div className="card">
            <img src={props.images[0]} className="card-img-top" alt="" />

            <div className="card-body">
                <header className="d-flex justify-content-between">
                    <h5 className="card-title">{props.title}</h5>
                    <span>{props.curr !== null ? props.curr.code : 'EUR'} {props.price}</span>
                </header>
                <p className="card-text text-muted">{props.description.substring(0, 100)}</p>
                <div>
                    <a onClick={() => props.pickTemplate(props._id)} className="btn btn-primary me-3">Pick Template</a>
                    <a href={'/view-template/' + props._id} className="btn btn-secondary">Preview Template</a>
                </div>
            </div>
        </div>

    );
}

export default TemplateComponent;