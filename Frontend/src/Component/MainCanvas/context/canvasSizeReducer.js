import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  canvasSize: []
};

const contentSlice = createSlice({
  name: 'canvasSize',
  initialState,
  reducers: {
    set: (state, action) => {
      const { width, height } = action.payload;
      // console.log("the payload");
      // console.log(action.payload);
      state.canvasSize=[ width, height ];
    },
  }
});

export const  {set} =contentSlice.actions
export default contentSlice.reducer;
