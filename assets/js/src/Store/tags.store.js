import { createStore } from 'redux';
import { initialTag } from '../Utils/initial-states';

export default createStore((state = initialTag, action) => {
    switch (action.type) {
        case 'set': state = action.payload;
        default: return state;
    }
});