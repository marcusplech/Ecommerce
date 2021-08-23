import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import reducers from "./reducers/index";

const enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunk];

const initialState = {};

export const store = createStore(
    reducers,
    initialState,
    enhancers(applyMiddleware(...middleware))
);
