import React, { useEffect } from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { commerce } from "../../lib/commerce";

import CartItem from "./CartItem/CartItem";
import useStyles from "./styles";
import { selectors } from "../../state/selectors/returns";
import { listCart } from "../../state/actions/index";

const Cart = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const cart = useSelector(selectors.getCart);

    const handleUpdateCartQty = async (productId, quantity) => {
        await commerce.cart.update(productId, { quantity });
        dispatch(listCart(productId, 1));
    };

    const handleRemoveFromCart = async (productId) => {
        await commerce.cart.remove(productId);
        dispatch(listCart(productId));
    };

    const handleEmptyCart = async () => {
        await commerce.cart.empty();
        dispatch(listCart());
    };

    const renderEmptyCart = () => (
        <Typography variant="subtitle1">
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
                            onUpdateCartQty={handleUpdateCartQty}
                            onRemoveFromCart={handleRemoveFromCart}
                        />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
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
                        Fechar Pedido
                    </Button>
                </div>
            </div>
        </>
    );

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h3" gutterBottom>
                Carrinho de Compras
            </Typography>
            {!cart.line_items.length ? renderEmptyCart() : renderCart()}
        </Container>
    );
};

export default Cart;
