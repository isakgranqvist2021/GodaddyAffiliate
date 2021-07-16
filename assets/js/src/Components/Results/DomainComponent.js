import React from 'react';
import { calcPrice, splitDomain } from './helpers';

function DomainComponent(props) {
    return <li className="list-group-item d-flex justify-content-between align-items-center">
        <div>
            <h3 className="mb-2">{splitDomain(props.domain)}</h3>
            <p className="mb-0">{props.available ? calcPrice(props.price) : 'Price Not Available'}</p>
        </div>
        <button className="btn btn-primary" onClick={() => props.pickDomain(props.domain)} disabled={!props.available}>
            {props.available ? 'Pick Domain' : 'Not Available'}
        </button>
    </li>
}

export default DomainComponent;