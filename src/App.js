import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { Products, NavBar, Cart, Checkout } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import useStyles from "./components/CheckoutForm/Checkout/styles";
import { CircularProgress } from "@material-ui/core";

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const classes = useStyles();

    const fetchProducts = async () => {
        setIsLoading(true);

        try {
            const { data } = await commerce.products.list();

            setProducts(data);
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
    };

    const handleAddToCart = async (productId, quantity) => {
        const { cart } = await commerce.cart.add(productId, quantity);

        setCart(cart);
    };

    const handleUpdateCartQty = async (productId, quantity) => {
        const { cart } = await commerce.cart.update(productId, { quantity });

        setCart(cart);
    };

    const handleRemoveFromCart = async (productId) => {
        const { cart } = await commerce.cart.remove(productId);

        setCart(cart);
    };

    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.empty();

        setCart(cart);
    };

    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();

        setCart(newCart);
    };

    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(
                checkoutTokenId,
                newOrder
            );

            setOrder(incomingOrder);

            refreshCart();
        } catch (error) {
            setErrorMessage(error.data.error.message);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    return (
        <>
            {isLoading ? (
                <div className={classes.spinner}>
                    <CircularProgress />
                </div>
            ) : (
                <Router>
                    <div>
                        <NavBar totalItems={cart.total_items} />
                        <Switch>
                            <Route exact path="/">
                                <Products
                                    products={products}
                                    onAddToCart={handleAddToCart}
                                    handleUpdateCartQty
                                />
                            </Route>
                            <Route exact path="/cart">
                                <Cart
                                    cart={cart}
                                    onUpdateCartQty={handleUpdateCartQty}
                                    onRemoveFromCart={handleRemoveFromCart}
                                    onEmptyCart={handleEmptyCart}
                                />
                            </Route>
                            <Route exact path="/checkout">
                                <Checkout
                                    cart={cart}
                                    order={order}
                                    onCaptureCheckout={handleCaptureCheckout}
                                    error={errorMessage}
                                />
                            </Route>
                        </Switch>
                    </div>
                </Router>
            )}
        </>
    );
};

export default App;
