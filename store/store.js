import { configureStore } from "@reduxjs/toolkit";
import rateSlice from './rate';

const store = configureStore({
  reducer: {
    rates: rateSlice, 
  },
});

export default store;
