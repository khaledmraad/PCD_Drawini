import { configureStore } from "@reduxjs/toolkit";
import contentReducer from "./contentReducer";
import canvasSizeReducer from "./canvasSizeReducer";
import userReducer from "./userNameReducer";
import userNameReducer from "./userNameReducer";

const store = configureStore({
  reducer: {
    content: contentReducer,
    canvasSize : canvasSizeReducer,
    userName:userNameReducer
  }
});

export default store;