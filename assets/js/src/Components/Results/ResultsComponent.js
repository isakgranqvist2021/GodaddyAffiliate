import React from 'react';
import searchStore from '../../Store/search.store';
import { initialSearchState } from '../../Utils/initial-states';
import PlaceholderComponent from '../Placeholder/PlaceholderComponent';
import DomainComponent from './DomainComponent';
import currStore from '../../Store/curr.store';

import './ResultsComponent.scss';

function ResultsComponent(props) {
    const [searchState, setSearchState] = React.useState(initialSearchState);
    const [curr, setCurr] = React.useState(null);
    const formRef = React.useRef();

    searchStore.subscribe(() => {
        setSearchState({ ...searchStore.getState() });
    });

    currStore.subscribe(() => {
        setCurr(currStore.getState());
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
                    <ul className="list-group">
                        <DomainComponent curr={curr} {...searchState.domain} pickDomain={pickDomain} active={true} />
                        {searchState.suggestions.map((domain, i) =>
                            <DomainComponent curr={curr} {...domain} pickDomain={pickDomain} key={i} active={false} />
                        )}
                    </ul>
                </div>
            )}
            {searchState.loading && (
                <div className="spinner-container">
                    <div className="spinner"></div>
                </div>
            )}
            {searchState.domain === null && (
                <div className="col-12 col-sm-10 col-md-6 m-auto pt-5">
                    <h3 className="text-muted text-center">
                        Choose from a wide selection of domains.
                        Checking domain name availability has never been easier
                    </h3>
                    <div className="d-flex justify-content-center mt-3">
                        {[
                            '.com', '.net', '.org', '.io', '.co', '.ai', '.biz'
                        ].map((str, i) => 
                            <span key={i} className="bg-primary text-white p-3 rounded me-3 flex-grow-1 text-center">
                                {str}
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ResultsComponent;