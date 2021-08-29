import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import reducers from "./reducers/index";

const enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//localStorage
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["theme"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const middleware = [thunk];
const initialState = {};

const store = createStore(
    persistedReducer,
    initialState,
    enhancers(applyMiddleware(...middleware))
);

const persistor = persistStore(store);

export { store, persistor };
