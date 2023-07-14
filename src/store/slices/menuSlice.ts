import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { menus as Menus } from "@prisma/client";
import { create } from "domain";
interface menuSliceType {
  isLoading: boolean;
  items: Menus[];
  error: Error | null;
}
const initialState: menuSliceType = {
  isLoading: false,
  items: [],
  error: null,
};
export const menuSlice = createSlice({
  name: "menus",
  initialState,
  reducers: {
    setMenu: (state, action) => {
      state.items = action.payload;
    },
    addMenu: (state, action: PayloadAction<Menus>) => {
      state.items = [...state.items, action.payload];
    },
    removeMenu: (state, action: PayloadAction<Menus>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});
export const { setMenu, addMenu, removeMenu } = menuSlice.actions;
export default menuSlice.reducer;
