import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../supabaseClient";

export const fetchcategories = createAsyncThunk(
  "categories/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.from("categories").select("*");
      if (error) throw error;
      return data;
    } catch (e) {
      return rejectWithValue(e.message || "خطأ في جلب المنتجات");
    }
  },
);

const CategoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchcategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchcategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    });
    builder.addCase(fetchcategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "فشل في جلب المنتجات";
    });
  },
});

export default CategoriesSlice.reducer;
