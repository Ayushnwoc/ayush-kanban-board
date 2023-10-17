import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./slices";


export const store = configureStore({
  reducer: {
    data : dataReducer,
  },
});
