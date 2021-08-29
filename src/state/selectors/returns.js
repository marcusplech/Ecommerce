const selectors = {
    getProducts: (state) => state.productList.products,
    getCartTotalItems: (state) => state.cart.cartItems.total_items,
    getCart: (state) => state.cart.cartItems,
    getTheme: (state) => state.theme,
    getLoading: (state) => state.productList.loading,
};

export { selectors };
