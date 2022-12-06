import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', () => {
  return axios
    .get(`https://izzi-ecom.herokuapp.com/products`)
    .then(response => response.data.data);
});

const products = createSlice({
  name: 'products',
  initialState: {
    products: [],

    allProductsScreenData: [],

    allProductsDisplay: [],

    categorySpecificProducts: [],
    categorySpecificProductsLoaded: false,

    filteredProducts: [],

    productsForDisplay: [],

    allproductsfetchloading: false,
    allproductsloaded: false,
  },

  reducers: {
    setCategorySpecificProducts: (state, action) => {
      state.categorySpecificProducts = action.payload.products;
      if (state.categorySpecificProducts != 0) {
        state.categorySpecificProductsLoaded = true;
      } else {
        state.categorySpecificProductsLoaded = false;
      }
    },
    setFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload.filteredProducts;
    },
    setProductsForDisplay: (state, action) => {
      state.productsForDisplay = action.payload.final;
    },
    setDisplayForAllProducts: (state, action) => {
      state.allProductsDisplay = action.payload.final;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchProducts.pending, state => {
      state.allproductsfetchloading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      (state.allproductsfetchloading = false), (state.allproductsloaded = true);
      state.products = action.payload;
    }),
      builder.addCase(fetchProducts.rejected, state => {
        (state.allproductsfetchloading = false), (state.products = []);
      });
  },
});

export const setCategorySpecificProductsDispatch =
  products.actions.setCategorySpecificProducts;
export const setFilteredProducts = products.actions.setFilteredProducts;
export const setProductsForDisplay = products.actions.setProductsForDisplay;
export const setAllProductsDisplay = products.actions.setDisplayForAllProducts;

export default products.reducer;
