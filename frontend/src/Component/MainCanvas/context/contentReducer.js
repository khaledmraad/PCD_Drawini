import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  content: []
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { id, name } = action.payload;
      console.log("the payload");
      console.log(action.payload);
      state.content.push({ id:id, name:name });
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.content = state.content.filter(item => item.id !== itemId);
    }
  }
});

export const { addItem,removeItem} = contentSlice.actions;
export default contentSlice.reducer;
