import { configureStore } from "@reduxjs/toolkit";

 import Categories from "./slices/Categories";
import products from "./slices/products";
import Wishlist from "./slices/Wishlist";

export const store = configureStore({

    reducer: {
        categories: Categories,
        products: products,
        wishlist:Wishlist,
    }
})