import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import commentSlice from "./commentSlice";

const store = configureStore({
  reducer: {
    commentSlice,
  },
  //   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
