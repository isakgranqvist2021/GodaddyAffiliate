import React from 'react';
import http from '../../Utils/http';
import { urlRegex } from '../../Utils/validators';
import searchStore from '../../Store/search.store';
import './SearchComponent.scss';


function SearchComponent(props) {
    const [query, setQuery] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState({ show: false, message: null });
    const submitBtn = React.useRef();

    const search = async () => {
        setLoading(true);
        searchStore.dispatch({ type: 'set-loading', payload: true });
        setError({ show: false, message: null });

        if (urlRegex.test(query)) {
            const response = await http.GET(`/search/${query}`);

            if(response.success) {
                searchStore.dispatch({
                    type: 'set-all',
                    payload: {
                        ...response.data,
                        loading: false
                    }
                });

                setLoading(false);
            } else {
                setLoading(false);
                searchStore.dispatch({
                    type: 'set-loading',
                    payload: false
                });
                window.alert(response.message);
            }

        } else {
            if (query.trim().length === 0) {
                setError({ show: true, message: `please enter a valid domain` });
            } else {
                setError({ show: true, message: `${query} is not a valid domain` });
            }

            setLoading(false);
            searchStore.dispatch({
                type: 'set-loading',
                payload: false
            });

        }
    }

    React.useEffect(() => {
        let search = new URLSearchParams(window.location.search);
        let q = search.get('q');

        if (q !== null) {
            setQuery(q);
        }

    }, [])

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            search();
        }
    }

    return (
        <div className="SearchComponent">
            <form className="d-flex mb-3">
                <input
                    className="form-control me-2"
                    placeholder="Click To Search: domain.com"
                    value={query}
                    disabled={loading}
                    onKeyPress={onKeyDown}
                    onChange={(e) => setQuery(e.target.value)}
                />

                <button className="btn btn-primary d-flex align-items-center" type="button" ref={submitBtn} onClick={search} disabled={loading}>
                    <span className="material-icons-outlined skiptranslate">search</span>
                </button>
            </form>
            {error.show && <p className="text-danger">{error.message}</p>}
            {loading && <p className="text-primary">Finding the best domains... this process might take some time</p>}
        </div>
    );
}

export default SearchComponent;

