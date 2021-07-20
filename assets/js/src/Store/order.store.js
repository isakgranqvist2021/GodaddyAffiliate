import { createStore } from 'redux';

function orderReducer(state = {}, action) {
    switch (action.type) {
        case 'update': return state = action.payload;
        default: return state;
    }
}

export default createStore(orderReducer);