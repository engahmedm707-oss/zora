import { configureStore } from "@reduxjs/toolkit";
import Productslice from "./slices/ProductSlice";
import BrandSlice from "./slices/brandSlice";
import CategoriesSlice from "./slices/categorySlice";
import authSlice from "./slices/authSlice";
export const store = configureStore({
  reducer: {
    products: Productslice,
    brands: BrandSlice,
    categories: CategoriesSlice,
    auth: authSlice,
  },
});
