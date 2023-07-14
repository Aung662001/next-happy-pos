import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { menus_menu_categories_locations as MenusMenuCategoriesLocation } from "@prisma/client";

interface MenusMenuCategoriesLocationType {
  isLoading: boolean;
  items: MenusMenuCategoriesLocation[];
  error: null | Error;
}
const initialState: MenusMenuCategoriesLocationType = {
  isLoading: false,
  items: [],
  error: null,
};
export const menusMenuCategoriesLocationSlice = createSlice({
  name: "menusMenuCategoriesLocation",
  initialState,
  reducers: {
    setMenusMenuCategoriesLocation: (state, action) => {
      state.items = action.payload;
    },
    addMenusMenuCategoriesLocation: (
      state,
      action: PayloadAction<MenusMenuCategoriesLocation>
    ) => {
      state.items = [...state.items, action.payload];
    },
    removeMenusMenuCategoriesLocation: (
      state,
      action: PayloadAction<MenusMenuCategoriesLocation>
    ) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});
export const {
  setMenusMenuCategoriesLocation,
  addMenusMenuCategoriesLocation,
  removeMenusMenuCategoriesLocation,
} = menusMenuCategoriesLocationSlice.actions;
export default menusMenuCategoriesLocationSlice.reducer;
