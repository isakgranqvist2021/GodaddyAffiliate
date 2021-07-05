import React from 'react';
import http from '../../Utils/http';
import './TemplateComponent.scss';

function TemplateComponent(props) {
    return (
        <div className="TemplateComponent">
            <div className="images">
                {props.images.map((img, i) => <img
                    src={`${http.serverAddr}/uploads/${img}`}
                    key={i}
                    alt="Website Preview"
                />)}
            </div>

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