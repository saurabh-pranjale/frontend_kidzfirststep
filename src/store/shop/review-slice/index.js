import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviews: [],
  error: null,
};

// Add Review
export const addReview = createAsyncThunk(
  "/order/addReview",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/shop/review/add",
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to add review");
    }
  }
);

// Get Reviews
export const getReviews = createAsyncThunk(
  "/order/getReviews",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/shop/review/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch reviews");
    }
  }
);

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Get Reviews
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.reviews = [];
        state.error = action.payload || "An error occurred while fetching reviews.";
      })

      // Add Review
      .addCase(addReview.rejected, (state, action) => {
        state.error = action.payload || "Failed to add review.";
      });
  },
});

export default reviewSlice.reducer;
