import { combineReducers } from "redux";
import { productListReducers, cartReducer } from "./reducers";

const reducers = combineReducers({
    productList: productListReducers,
    cart: cartReducer,
});

export default reducers;
