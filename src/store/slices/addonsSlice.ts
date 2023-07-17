import { PayloadAction, createSlice } from "@reduxjs/toolkit";
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
    addAddon: (state, action: PayloadAction<Addons>) => {
      state.items = [...state.items, action.payload];
    },
    removeAddon: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});
export const { setAddons, addAddon, removeAddon } = addonSlice.actions;
export default addonSlice.reducer;
