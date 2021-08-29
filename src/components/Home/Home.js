import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";

import { selectors } from "../../state/selectors/returns";
import useStyles from "../CheckoutForm/Checkout/styles";
import Products from "../Products/Products";
import { listProducts, listCart } from "../../state/actions";

const Home = () => {
    const classes = useStyles();
    const loading = useSelector(selectors.getLoading);

    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);

    const { error } = productList;

    useEffect(() => {
        try {
            dispatch(listProducts());
            dispatch(listCart());
        } catch (error) {
            console.log(error);
        }
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
