import { createSlice } from "@reduxjs/toolkit";
import { menu_categories as MenusCategories } from "@prisma/client";
interface menuSliceType {
  isLoading: boolean;
  items: MenusCategories[];
  error: Error | null;
}
const initialState: menuSliceType = {
  isLoading: false,
  items: [],
  error: null,
};
export const menuCategoriesSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenuCategories: (state, action) => {
      state.items = action.payload;
    },
  },
});
export const { setMenuCategories } = menuCategoriesSlice.actions;
export default menuCategoriesSlice.reducer;
