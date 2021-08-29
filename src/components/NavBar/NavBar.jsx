import React from "react";
import "./NavBar.css";
import {
    AppBar,
    Toolbar,
    IconButton,
    Badge,
    Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import logo from "../../assets/commerce.png";
import useStyles from "./styles";
import { selectors } from "../../state/selectors/returns";
import { TOOGLE_SWITCHER } from "../../state/actions/types";

export const LocationDisplay = () => {
    const location = useLocation();

    return <div data-testid="location-display">{location.pathname}</div>;
};

const NavBar = () => {
    const classes = useStyles();
    const totalItems = useSelector(selectors.getCartTotalItems);
    const dispatch = useDispatch();
    const theme = useSelector(selectors.getTheme);

    return (
        <>
            <AppBar
                style={{ backgroundColor: theme.nav }}
                position="fixed"
                className={classes.appBar}
                color="inherit"
            >
                <Toolbar>
                    <Typography
                        style={{ color: theme.text }}
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
                    <div>
                        <input
                            className="input-mode"
                            checked={theme.isDarkMode}
                            onChange={() => dispatch({ type: TOOGLE_SWITCHER })}
                            type="checkbox"
                            id="switch"
                            name="theme"
                        />

                        <label
                            className="label-mode"
                            htmlFor="switch"
                            style={{ marginRight: "10px" }}
                        >
                            Toggle
                        </label>
                    </div>
                    {theme.isDarkMode === true ? (
                        <NightsStayIcon style={{ color: theme.icon }} />
                    ) : (
                        <WbSunnyIcon style={{ color: theme.icon }} />
                    )}
                    <div className={classes.button}>
                        <IconButton
                            role="button"
                            component={Link}
                            to="/cart"
                            arial-label="Show cart items"
                            color="inherit"
                        >
                            <Badge
                                badgeContent={totalItems}
                                style={{ color: theme.icon }}
                                color="secondary"
                            >
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
