import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../supabaseClient";

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ fullName, email, password }, { rejectWithValue }) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;
      if (authData.user) {
        const { error } = await supabase.from("profiles").upsert(
          {
            id: authData.user.id,
            full_name: fullName,
            role: "user",
          },
          { onConflict: "id" },
        );
        if (error) throw error;
        return authData.user;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

//create async thunk to login

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) throw error;
      return data.user;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);
// أكشن لجلب بيانات البروفايل (الاسم، الدور، إلخ)
export const fetchUserProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (userId, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;
      return data; // بيرجع الـ full_name والـ role وباقي البيانات
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.profile = null;
      state.error = null;
      state.loading = false;

      // سوبابيز بتمسح التوكين من اللوكال ستوريج فوراً
      supabase.auth.signOut();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        ((state.loading = true), (state.error = false));
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //add case to login user
    builder
      .addCase(loginUser.pending, (state) => {
        ((state.loading = true), (state.error = false));
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      // عند نجاح الدخول، نحدث بيانات اليوزر

      // عند جلب البروفايل بنجاح
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      });
  },
});

export default authSlice.reducer;
export const { setUser, logout } = authSlice.actions;
