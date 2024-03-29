export const initialCreateTemplateState = {
    title: '',
    description: '',
    price: 0,
    service: 'WordPress',
    images: [],
    removedImages: [],
    tags: [],
    active: false
};

export const initialSearchState = {
    loading: false,
    domain: null,
    suggestions: null
};

export const initialCurrState = {
    code: 'EUR',
    value: 1
};

export const initialModalState = {
    open: false,
    label: null,
    orderId: null
};

export const initialTag = 'Business';