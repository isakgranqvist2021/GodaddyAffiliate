import React from 'react';
import { calcPrice, splitDomain } from './helpers';

function DomainComponent(props) {
    return (
        <div className="domain">
            <div>
                <h3>{splitDomain(props.domain)}</h3>
                <p>{props.available ? calcPrice(props.price) : 'Price Not Available'}</p>
            </div>
            <div>
                <button onClick={() => props.pickDomain(props.domain)} disabled={!props.available}>
                    {props.available ? 'Pick Domain' : 'Not Available'}
                </button>
            </div>
        </div>
    );
}

export default DomainComponent;