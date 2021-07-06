import React from 'react';

export const calcPrice = (price) => {
    let numWithZeroes = (price * 0.000001).toLocaleString('en', {
        useGrouping: false,
        minimumFractionDigits: 2,
    });

    return `$${numWithZeroes}`;
}

export const splitDomain = (domain) => {
    if (domain !== undefined && domain !== null) {
        let parts = domain.split('.');

        return <div>
            <span>{parts[0]}</span>
            <span className="domain-ext">.{parts[1]}</span>
        </div>
    }

    return 'Domain Not Supported';
}