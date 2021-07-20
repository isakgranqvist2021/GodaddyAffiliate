import { createStore } from 'redux';
import { initialModalState } from '../Utils/initial-states';

// an open action should always include a payload
function modalReducer(state = initialModalState, action) {
    switch (action.type) {
        case 'open': return state = action.payload;
        case 'close': return state = initialModalState;
        default: return state;
    }
}

export default createStore(modalReducer);