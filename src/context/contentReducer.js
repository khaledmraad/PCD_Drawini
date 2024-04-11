import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  content: [] // Ensure content is initialized as an array
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { id, name } = action.payload;
      state.content.push({ id:id, name:name });
    }
  }
});

export const { addItem } = contentSlice.actions;
export default contentSlice.reducer;
