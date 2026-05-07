import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../supabaseClient";

export const fetchBrands = createAsyncThunk(
  "prands/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.from("brands").select("*");
      if (error) throw error;
      return data;
    } catch (e) {
      return rejectWithValue(e.message || "خطأ في جلب المنتجات");
    }
  },
);
const BrandSlice = createSlice({
  name: "brands",
  initialState: {
    brands: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBrands.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBrands.fulfilled, (state, action) => {
      state.loading = false;
      state.prands = action.payload;
    });
    builder.addCase(fetchBrands.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "فشل في جلب المنتجات";
    });
  },
});

export default BrandSlice.reducer;
