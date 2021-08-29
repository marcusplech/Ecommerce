import { commerce } from "../../lib/commerce";
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_LOADING,
    LIST_CART,
    TOOGLE_SWITCHER,
} from "./types";

export const listProducts = () => async (dispatch) => {
    dispatch({ type: PRODUCT_LIST_LOADING, payload: true });
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });

        const { data } = await commerce.products.list();

        dispatch({
            type: PRODUCT_LIST_SUCESS,
            payload: data,
        });
        dispatch({ type: PRODUCT_LIST_LOADING, payload: false });
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.data.error.message,
        });
        dispatch({ type: PRODUCT_LIST_LOADING, payload: true });
    }
};

export const listCart = () => async (dispatch) => {
    try {
        const commerceListCart = await commerce.cart.retrieve();
        dispatch({ type: LIST_CART, payload: commerceListCart });
    } catch (error) {
        console.log(error);
    }
};

export const toggleDarkMode = () => (dispatch) => {
    dispatch({ type: TOOGLE_SWITCHER });
};
