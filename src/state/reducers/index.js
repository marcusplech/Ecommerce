import { combineReducers } from "redux";
import { productListReducers, cartReducer, themeReducer } from "./reducers";

const reducers = combineReducers({
    productList: productListReducers,
    cart: cartReducer,
    theme: themeReducer,
});

export default reducers;
