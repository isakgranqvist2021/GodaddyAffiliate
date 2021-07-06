import React from 'react';
import searchStore from '../../Store/search.store';
import { initialSearchState } from '../../Utils/initial-states';
import PlaceholderComponent from '../Placeholder/PlaceholderComponent';
import './ResultsComponent.scss';

function ResultsComponent(props) {
    const [searchState, setSearchState] = React.useState(initialSearchState);

    searchStore.subscribe(() => {
        console.log(searchStore.getState());

        setSearchState({ ...searchStore.getState() });
    });

    return (
        <div className="ResultsComponent">
            {searchState.domain !== null && searchState.suggestions !== null && !searchState.loading && (
                <div className="results-container">
                    <div className="domain">
                        {searchState.domain.domain && <h3>{searchState.domain.domain}</h3>}
                        {!searchState.domain.domain && <h3>Domain Not Supported</h3>}
                        <button disabled={!searchState.domain.available}>{searchState.domain.available ? 'Pick Domain' : 'Not Available'}</button>
                    </div>
                    <div className="suggestions">
                        {searchState.suggestions.map((domain, i) => {
                            return <div className="domain" key={i}>
                                <h3>{domain.domain}</h3>
                                <button disabled={!domain.available}>{domain.available ? 'Pick Domain' : 'Not Available'}</button>
                            </div>
                        })}
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