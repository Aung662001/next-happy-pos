import { createSlice } from "@reduxjs/toolkit";
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
  },
});
export const { setMenu } = menuSlice.actions;
export default menuSlice.reducer;
