import { initialCurrState } from '../Utils/initial-states';
import { createStore } from 'redux';

function currReducer(state = initialCurrState, action) {
    switch (action.type) {
        case 'set': state = action.payload;
        default: return state;
    }
}

export default createStore(currReducer);
