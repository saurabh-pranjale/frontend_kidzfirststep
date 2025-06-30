import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/shop/wishlist";

// ✅ Async Thunks

// Add to wishlist
export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async ({ userId, productId }, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}/add`, { userId, productId });
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to add to wishlist");
    }
  }
);

// Fetch wishlist items
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (userId, thunkAPI) => {
    try {
      const res = await axios.get(`${BASE_URL}/${userId}`);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch wishlist");
    }
  }
);

// Remove from wishlist
export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async ({ userId, productId }, thunkAPI) => {
    try {
      await axios.delete(`${BASE_URL}/${userId}/${productId}`);
      return productId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to remove from wishlist");
    }
  }
);

// Move to cart
export const moveWishlistItemToCart = createAsyncThunk(
  "wishlist/moveToCart",
  async ({ userId, productId }, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}/move-to-cart`, { userId, productId });
      return { productId, message: res.data.message };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to move to cart");
    }
  }
);

// ✅ Slice

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearWishlistMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // ➕ Add
      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
        state.successMessage = "Added to wishlist";
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 📥 Fetch
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ❌ Remove
      .addCase(removeFromWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((item) => item.productId !== action.payload);
        state.successMessage = "Removed from wishlist";
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔄 Move to Cart
      .addCase(moveWishlistItemToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(moveWishlistItemToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((item) => item.productId !== action.payload.productId);
        state.successMessage = action.payload.message || "Moved to cart";
      })
      .addCase(moveWishlistItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearWishlistMessages } = wishlistSlice.actions;
export default wishlistSlice.reducer;
