import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Products from "../Products/Products";
import { listProducts, listCart } from "../../state/actions";

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        try {
            dispatch(listProducts());
            dispatch(listCart());
        } catch (error) {
            console.log(error);
        }
    }, [dispatch]);

    return (
        <div>
            <Products />
        </div>
    );
};

export default Home;
