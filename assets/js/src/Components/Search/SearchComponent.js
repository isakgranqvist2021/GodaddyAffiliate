import React from 'react';
import http from '../../Utils/http';
import { urlRegex } from '../../Utils/validators';
import searchStore from '../../Store/search.store';
import './SearchComponent.scss';


function SearchComponent(props) {
    const [query, setQuery] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState({ show: false, message: null });
    const [hasSearched, setHasSearched] = React.useState(false);

    const search = async () => {
        setLoading(true);
        searchStore.dispatch({ type: 'set-loading', payload: true });
        setError({ show: false, message: null });

        if (urlRegex.test(query)) {

            const response = await http.GET(`/search/${query}`);

            searchStore.dispatch({
                type: 'set-all',
                payload: {
                    ...response.data,
                    loading: false
                }
            });

            setLoading(false);

        } else {

            setError({ show: true, message: `${query} is not a valid domain` });
            setLoading(false);

            searchStore.dispatch({
                type: 'set-loading',
                payload: false
            });

        }
    }

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            search();
        }
    }

    return (
        <div className="SearchComponent">
            <form>
                <input
                    placeholder="my-domain.com"
                    value={query}
                    disabled={loading}
                    onKeyPress={onKeyDown}
                    onChange={(e) => setQuery(e.target.value)}
                />

                <button type="button" onClick={search} disabled={loading}>
                    <span className="material-icons-outlined">search</span>
                </button>
            </form>
            {error.show && <p>{error.message}</p>}
        </div>
    );
}

export default SearchComponent;

