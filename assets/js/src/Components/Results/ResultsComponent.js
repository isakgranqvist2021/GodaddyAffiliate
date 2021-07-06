import React from 'react';
import searchStore from '../../Store/search.store';
import { initialSearchState } from '../../Utils/initial-states';
import PlaceholderComponent from '../Placeholder/PlaceholderComponent';
import DomainComponent from './DomainComponent';

import http from '../../Utils/http';

import './ResultsComponent.scss';

function ResultsComponent(props) {
    const [searchState, setSearchState] = React.useState(initialSearchState);
    const formRef = React.useRef();

    searchStore.subscribe(() => {
        console.log(searchStore.getState());

        setSearchState({ ...searchStore.getState() });
    });


    const pickDomain = (domain) => {
        let input = document.createElement('input');
        input.setAttribute('name', 'domain');
        input.setAttribute('value', domain);
        formRef.current.appendChild(input);
        formRef.current.submit();
    }

    return (
        <div className="ResultsComponent">
            <form ref={formRef} method="POST" action="/pick-domain"></form>
            {searchState.domain !== null && searchState.suggestions !== null && !searchState.loading && (
                <div className="results-container">
                    <div className="found">
                        <DomainComponent {...searchState.domain} pickDomain={pickDomain} />
                    </div>

                    <div className="suggestions">
                        {searchState.suggestions.map((domain, i) =>
                            <DomainComponent {...domain} pickDomain={pickDomain} key={i} />
                        )}
                    </div>
                </div>
            )}
            {searchState.loading && (
                <div className="spinner-container">
                    <div className="spinner"></div>
                </div>
            )}
            {searchState.domain === null && (
                <div>
                    {new Array(5).fill(0).map((_, i) => <PlaceholderComponent key={i} />)}
                </div>
            )}
        </div>
    );
}

export default ResultsComponent;