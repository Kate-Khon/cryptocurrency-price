import { createSlice } from "@reduxjs/toolkit";

const initialState = { btc: null, };

const rateSlice = createSlice({
  name: 'rate',
  initialState,
  reducers: {
    setNewData: (state, action) => {
      state.btc = action.payload;
    }
  },
});

export default rateSlice.reducer;
export const { setNewData } = rateSlice.actions;
