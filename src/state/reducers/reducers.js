import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_LOADING,
    LIST_CART,
} from "../actions/types";

export const productListReducers = (
    state = { products: [], loading: false, error: null },
    action
) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] };

        case PRODUCT_LIST_SUCESS:
            return { loading: false, products: action.payload };

        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload };

        case PRODUCT_LIST_LOADING:
            return { ...state, loading: action.payload };

        default:
            return state;
    }
};

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case LIST_CART:
            return {
                ...state,
                cartItems: action.payload,
            };
        default:
            return state;
    }
};
