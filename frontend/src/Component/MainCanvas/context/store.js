import { configureStore } from "@reduxjs/toolkit";
import contentReducer from "./contentReducer";

const store = configureStore({
  reducer: {
    content: contentReducer
  }
});

export default store;