import React from 'react';

export const splitDomain = (domain) => {
    if (domain !== undefined && domain !== null) {
        let parts = domain.split('.');

        return <div>
            <span>{parts[0]}</span>
            <span className="text-primary">.{parts[1]}</span>
        </div>
    }

    return 'Domain Not Supported';
}