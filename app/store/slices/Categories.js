import { createSlice } from "@reduxjs/toolkit";



const categories = createSlice({
    name: "categories",
    initialState: {
        content: [],
        categoriesSet:false,
    },
    reducers: {
        setCategories: (state,action) => {
            state.content = action.payload.categories
            state.categoriesSet=true
        }
    }
})

export const setCategoriesArray= categories.actions.setCategories

export default categories.reducer