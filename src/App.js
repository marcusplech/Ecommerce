import React from "react";
import { NavBar, Cart, Checkout, Home } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { selectors } from "./state/selectors/returns";
import { useSelector } from "react-redux";

const App = () => {
    const theme = useSelector(selectors.getTheme);
    return (
        <>
            <Router>
                <NavBar />
                <div
                    className="App"
                    style={{ backgroundColor: theme.background }}
                >
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/cart" exact component={Cart} />
                        <Route path="/checkout" exact component={Checkout} />
                    </Switch>
                </div>
            </Router>
        </>
    );
};

export default App;
