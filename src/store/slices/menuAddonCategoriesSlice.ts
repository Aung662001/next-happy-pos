import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { menus_addon_categories as MenusAddonCategories } from "@prisma/client";

interface MenusAddonCategoriesType {
  isLoading: boolean;
  items: MenusAddonCategories[];
  error: null | Error;
}
const initialState: MenusAddonCategoriesType = {
  isLoading: false,
  items: [],
  error: null,
};
export const menusAddonCategoriesSlice = createSlice({
  name: "menusAddonCategoriesSlice",
  initialState,
  reducers: {
    setMenusAddonCategories: (state, action) => {
      state.items = action.payload;
    },
    addMenusAddonCategories: (
      state,
      action: PayloadAction<MenusAddonCategories>
    ) => {
      state.items = [...state.items, action.payload];
    },
    removeMenusAddonCategories: (
      state,
      action: PayloadAction<MenusAddonCategories>
    ) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});
export const {
  setMenusAddonCategories,
  addMenusAddonCategories,
  removeMenusAddonCategories,
} = menusAddonCategoriesSlice.actions;
export default menusAddonCategoriesSlice.reducer;
