import React from 'react';
import { splitDomain } from './helpers';

function DomainComponent(props) {
    if (!props.available) {
        return <li className="list-group-item d-flex justify-content-between align-items-center disabled">
            <div>
                <h3 className="mb-2">{splitDomain(props.domain)}</h3>
                <p className="mb-0">Price Not Available</p>
            </div>
            <button className="btn btn-primary disabled">Not Available</button>
        </li>
    } else if (props.active) {
        return <li className="list-group-item d-flex justify-content-between align-items-center active">
            <div>
                <h3 className="mb-2">{props.domain}</h3>
                <p className="mb-0">${props.price}</p>
            </div>
            <button className="btn btn-light" onClick={() => props.pickDomain(props.domain)} disabled={!props.available}>Pick Domain</button>
        </li>
    } else {
        return <li className="list-group-item d-flex justify-content-between align-items-center">
            <div>
                <h3 className="mb-2">{splitDomain(props.domain)}</h3>
                <p className="mb-0">${props.price}</p>
            </div>
            <button className="btn btn-primary" onClick={() => props.pickDomain(props.domain)}>
                Pick Domain
            </button>
        </li>
    }
}

export default DomainComponent;