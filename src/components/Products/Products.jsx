import React from 'react'
import { Grid } from '@material-ui/core'

import Product from './Product/Product'
import useStyles from './styles'

const products = [
    { id: 1, name: 'Shoes', description: 'Running shoes', price: "$5", image:'' },
    { id: 2, name: 'Macbook', description: 'Apple macbook', price:'$10', image: ''}
]

const Products = ({ products, onAddToCart }) => {
    const classes = useStyles()

    return (
    <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container justifyContent="center" spacing={4}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} md={4} lg={3}>
                        <Product product={product} onAddToCart={onAddToCart} />
                    </Grid>
                ))}
        </Grid>
    </main>
    )
}

export default Products