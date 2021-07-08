import { createStore } from 'redux';

function verifyStore(state = { open: false }, action) {
    switch (action.type) {
        case 'open': return state.open = true;
        case 'close': return state.open = false;
        case 'toggle': return state.open = !state.open;
        default: return state;
    }
}

export default createStore(verifyStore);