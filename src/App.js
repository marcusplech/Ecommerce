import React from "react";
import { NavBar, Cart, Checkout, Home } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
    return (
        <>
            <Router>
                <div>
                    <NavBar />
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/cart">
                            <Cart />
                        </Route>
                        <Route exact path="/checkout">
                            <Checkout />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </>
    );
};

export default App;
