import React, { useState } from "react";
import { commerce } from "../../../lib/commerce";
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    IconButton,
    CircularProgress,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";

import useStyles from "./styles";
import { listCart } from "../../../state/actions";
import { selectors } from "../../../state/selectors/returns";

const Product = ({ product }) => {
    const classes = useStyles();
    const image = product.media.source;
    const title = product.name;
    const price = product.price.formatted_with_symbol;
    const description = product.description;
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const theme = useSelector(selectors.getTheme);

    const handleAddToCart = async (productId, quantity) => {
        setLoading(true);
        try {
            await commerce.cart.add(productId, quantity);
            dispatch(listCart(productId));
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    return (
        <>
            <div>
                <Card
                    style={{ backgroundColor: theme.nav }}
                    className={classes.root}
                >
                    <CardMedia
                        style={{ backgroundColor: theme.primary }}
                        className={classes.media}
                        image={image}
                        title={title}
                    />
                    <CardContent>
                        <div
                            style={{ color: theme.text }}
                            className={classes.cardContent}
                        >
                            <Typography variant="h5" gutterBottom>
                                {title}
                            </Typography>
                            <Typography variant="h5">{price}</Typography>
                        </div>
                        <Typography
                            dangerouslySetInnerHTML={{
                                __html: description,
                            }}
                            variant="body2"
                            color="textSecondary"
                            style={{
                                fontWeight: "600",
                                color: theme.text,
                            }}
                        />
                    </CardContent>
                    <CardActions disableSpacing className={classes.cardActions}>
                        {loading ? (
                            <div className={classes.spinner}>
                                <CircularProgress />
                            </div>
                        ) : (
                            <IconButton
                                style={{ color: theme.icon }}
                                aria-label="Add to Cart"
                                onClick={() => handleAddToCart(product.id, 1)}
                            >
                                <AddShoppingCart />
                            </IconButton>
                        )}
                    </CardActions>
                </Card>
            </div>
        </>
    );
};

export default Product;
