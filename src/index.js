import React from "react";
import reactDOM from "react-dom";
import { Provider } from "react-redux";

//localstorage
import { persistor, store } from "./state/store";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";

reactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);
