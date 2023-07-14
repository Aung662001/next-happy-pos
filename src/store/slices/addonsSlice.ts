import { createSlice } from "@reduxjs/toolkit";
import { addons as Addons } from "@prisma/client";
import { create } from "domain";
interface menuSliceType {
  isLoading: boolean;
  items: Addons[];
  error: Error | null;
}
const initialState: menuSliceType = {
  isLoading: false,
  items: [],
  error: null,
};
export const addonSlice = createSlice({
  name: "addons",
  initialState,
  reducers: {
    setAddons: (state, action) => {
      state.items = action.payload;
    },
  },
});
export const { setAddons } = addonSlice.actions;
export default addonSlice.reducer;
