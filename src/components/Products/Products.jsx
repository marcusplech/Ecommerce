import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

import Product from "./Product/Product";
import { selectors } from "../../state/selectors/returns";
import useStyles from "./styles";

const Products = () => {
    const classes = useStyles();
    const stateProducts = useSelector(selectors.getProducts);
    const theme = useSelector(selectors.getTheme);
    const loading = useSelector(selectors.getLoading);

    return (
        <main
            style={{ backgroundColor: theme.background }}
            className={classes.content}
        >
            <div className={classes.toolbar} />
            {loading ? (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    className={classes.spinner}
                >
                    <CircularProgress />
                </div>
            ) : (
                <Grid container justifyContent="center" spacing={4}>
                    {stateProducts.map((product) => (
                        <Grid item key={product.id} xs={12} md={4} lg={3}>
                            <Product product={product} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </main>
    );
};

export default Products;
