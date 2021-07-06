import { createStore } from 'redux';
import { initialSearchState } from '../Utils/initial-states';

function searchReducer(state = initialSearchState, action) {
    switch (action.type) {
        case 'set-loading':
            state.loading = action.payload;
            return state;

        case 'set-domain':
            state.domain = action.payload;
            return state;

        case 'set-suggestions':
            state.suggestions = action.payload;
            return state;

        case 'set-all':
            state = action.payload;
            return state;

        default: return state;
    }
}

export default createStore(searchReducer);