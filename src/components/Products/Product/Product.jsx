import React from "react";
import { commerce } from "../../../lib/commerce";
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    IconButton,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import { useDispatch } from "react-redux";

import useStyles from "./styles";
import { listCart } from "../../../state/actions";

const Product = ({ product }) => {
    const classes = useStyles();
    const image = product.media.source;
    const title = product.name;
    const price = product.price.formatted_with_symbol;
    const description = product.description;

    const dispatch = useDispatch();

    const handleAddToCart = async (productId, quantity) => {
        await commerce.cart.add(productId, quantity);
        dispatch(listCart(productId));
    };

    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={image} title={title} />
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant="h5" gutterBottom>
                        {title}
                    </Typography>
                    <Typography variant="h5">{price}</Typography>
                </div>
                <Typography
                    dangerouslySetInnerHTML={{ __html: description }}
                    variant="body2"
                    color="textSecondary"
                    style={{ fontWeight: "600" }}
                />
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton
                    aria-label="Add to Cart"
                    onClick={() => handleAddToCart(product.id, 1)}
                >
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default Product;
