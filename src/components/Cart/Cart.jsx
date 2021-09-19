import React, { useState, useEffect } from "react";
import {
    Container,
    Typography,
    Button,
    Grid,
    CircularProgress,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { commerce } from "../../lib/commerce";

import CartItem from "./CartItem/CartItem";
import useStyles from "./styles";
import { selectors } from "../../state/selectors/returns";
import { listCart } from "../../state/actions/index";

const Cart = () => {
    const [loading, setLoading] = useState(false);
    const [loadingEmpty, setLoadingEmpty] = useState(false);

    const classes = useStyles();
    const dispatch = useDispatch();
    const cart = useSelector(selectors.getCart);
    const theme = useSelector(selectors.getTheme);

    const handleUpdateCartQty = async (productId, quantity) => {
        try {
            await commerce.cart.update(productId, { quantity });
            dispatch(listCart(productId, 1));
        } catch (error) {
            console.log(error);
        }
    };

    const handleRemoveFromCart = async (productId) => {
        setLoading(true);
        try {
            await commerce.cart.remove(productId);
            dispatch(listCart(productId));
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    const handleEmptyCart = async () => {
        setLoadingEmpty(true);
        try {
            await commerce.cart.empty();
            dispatch(listCart());
        } catch (error) {
            console.log(error);
        }
        setLoadingEmpty(false);
    };

    const renderEmptyCart = () => (
        <Typography style={{ color: theme.text }} variant="subtitle1">
            Seu carrinho de compras está vazio,
            <Link className={classes.link} to="/">
                {" "}
                veja nossas recomendações
            </Link>
            !
        </Typography>
    );

    useEffect(() => {
        dispatch(listCart());
    }, [dispatch]);

    if (!cart.line_items) return "Loading";

    const renderCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((lineItem) => (
                    <Grid item xs={12} sm={4} key={lineItem.id}>
                        <CartItem
                            item={lineItem}
                            loading={loading}
                            onUpdateCartQty={handleUpdateCartQty}
                            onRemoveFromCart={handleRemoveFromCart}
                        />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography
                    variant="h4"
                    style={{ fontSize: "25px", color: theme.text }}
                >
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                </Typography>
                {loadingEmpty ? (
                    <div className={classes.spinner}>
                        <CircularProgress />
                    </div>
                ) : (
                    <div style={{ marginLeft: "20px" }}>
                        <Button
                            className={classes.emptyButton}
                            size="large"
                            type="button"
                            variant="contained"
                            color="secondary"
                            onClick={handleEmptyCart}
                        >
                            Esvaziar Carrinho
                        </Button>
                        <Button
                            className={classes.checkoutButton}
                            component={Link}
                            to="/checkout"
                            size="large"
                            type="button"
                            variant="contained"
                            color="primary"
                        >
                            Finalizar Compra
                        </Button>
                    </div>
                )}
            </div>
        </>
    );

    return (
        <Container
            style={{
                backgroundColor: theme.background,
                maxWidth: "none",
            }}
        >
            <div className={classes.toolbar} />
            <Typography
                style={{ color: theme.text }}
                className={classes.title}
                variant="h3"
                gutterBottom
            >
                Carrinho de Compras
            </Typography>
            {!cart.line_items.length ? renderEmptyCart() : renderCart()}
        </Container>
    );
};

export default Cart;
