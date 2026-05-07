import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../supabaseClient";

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.from("products").select("*");
      if (error) throw error;
      return data;
    } catch (e) {
      return rejectWithValue(e.message || "خطأ في جلب المنتجات");
    }
  },
);

export const fetchSingleProduct = createAsyncThunk(
  "products/fetchSingle",
  async (id, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data;
    } catch (e) {
      return rejectWithValue(e.message || "خطأ في جلب المنتج");
    }
  },
);

const Productslice = createSlice({
  name: "products",
  initialState: {
    products: [],
    singleProduct: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSingleProduct: (state) => {
      state.singleProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "فشل في جلب المنتجات";
    });
    // Single product cases
    builder.addCase(fetchSingleProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.singleProduct = action.payload;
    });
    builder.addCase(fetchSingleProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "فشل في جلب المنتج";
    });
  },
});

export default Productslice.reducer;
