import React from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Badge,
    Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import logo from "../../assets/commerce.png";
import useStyles from "./styles";
import { selectors } from "../../state/selectors/returns";

export const LocationDisplay = () => {
    const location = useLocation();

    return <div data-testid="location-display">{location.pathname}</div>;
};

const NavBar = () => {
    // const location = useLocation();
    const classes = useStyles();
    const totalItems = useSelector(selectors.getCartTotalItems);

    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                {/* <LocationDisplay /> */}
                <Toolbar>
                    <Typography
                        role="icon-logo"
                        component={Link}
                        to="/"
                        variant="h6"
                        className={classes.title}
                        color="inherit"
                    >
                        <img
                            src={logo}
                            alt="icon logo"
                            height="25px"
                            className={classes.image}
                        />
                        E-commerce
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.button}>
                        <IconButton
                            role="button"
                            component={Link}
                            to="/cart"
                            arial-label="Show cart items"
                            color="inherit"
                        >
                            <Badge badgeContent={totalItems} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default NavBar;
