import { configureStore } from "@reduxjs/toolkit";
import contentReducer from "./contentReducer";
import canvasSizeReducer from "./canvasSizeReducer";

const store = configureStore({
  reducer: {
    content: contentReducer,
    canvasSize : canvasSizeReducer
  }
});

export default store;