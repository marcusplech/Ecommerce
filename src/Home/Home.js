import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";

import useStyles from "../components/CheckoutForm/Checkout/styles";
import Products from "../components/Products/Products";
import { listProducts, listCart } from "../state/actions";

const Home = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);

    const { loading, error } = productList;

    useEffect(() => {
        dispatch(listProducts());
        dispatch(listCart());
    }, [dispatch]);

    return (
        <div>
            {loading ? (
                <div className={classes.spinner}>
                    <CircularProgress />
                </div>
            ) : error ? (
                <h3>Erro</h3>
            ) : (
                <Products />
            )}
        </div>
    );
};

export default Home;
