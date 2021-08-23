import React from "react";
import reactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./state/store";

import App from "./App";

reactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
