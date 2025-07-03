import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [],
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeFeed: (state, action) => {
      const newArr = state.filter((r) => r._id !== action.payload);
      return newArr;
    },
    resetFeed: (state) => {
      return [];
    },
  },
});

export const { addFeed, removeFeed, resetFeed } = feedSlice.actions;
export default feedSlice.reducer;
