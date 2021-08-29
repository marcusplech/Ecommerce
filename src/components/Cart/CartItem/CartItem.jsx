import React from "react";
import {
    Typography,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
} from "@material-ui/core";
import { useSelector } from "react-redux";

import useStyles from "./styles";
import { selectors } from "../../../state/selectors/returns";
const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart, loading }) => {
    const classes = useStyles();
    const theme = useSelector(selectors.getTheme);

    return (
        <Card style={{ backgroundColor: theme.nav }}>
            <CardMedia
                image={item.media.source}
                alt={item.name}
                className={classes.media}
            />
            <CardContent
                className={classes.cardContent}
                style={{ color: theme.text }}
            >
                <Typography variant="h4" style={{ fontSize: "25px" }}>
                    {item.name}
                </Typography>
                <Typography variant="h5">
                    {item.line_total.formatted_with_symbol}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <div className={classes.buttons}>
                    <Button
                        style={{ color: theme.text }}
                        type="button"
                        size="small"
                        onClick={() =>
                            onUpdateCartQty(item.id, item.quantity - 1)
                        }
                    >
                        -
                    </Button>
                    <Typography style={{ color: theme.text }}>
                        {item.quantity}
                    </Typography>
                    <Button
                        style={{ color: theme.text }}
                        type="button"
                        size="small"
                        onClick={() =>
                            onUpdateCartQty(item.id, item.quantity + 1)
                        }
                    >
                        +
                    </Button>
                </div>
                <Button
                    variant="contained"
                    type="button"
                    color="secondary"
                    onClick={() => onRemoveFromCart(item.id)}
                >
                    Excluir
                </Button>
            </CardActions>
        </Card>
    );
};

export default CartItem;
