import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: "requests",
  initialState: [],
  reducers: {
    addRequests: (state, action) => {
      return action.payload;
    },
    removeRequests: (state, action) => {
      const newArr = state.filter((r) => r._id !== action.payload);
      return newArr;
    },
    resetRequest: (state) => {
      return [];
    },
  },
});

export const { addRequests, removeRequests, resetRequest } =
  requestsSlice.actions;
export default requestsSlice.reducer;
