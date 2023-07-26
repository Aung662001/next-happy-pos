import { PayloadAction, createSlice } from "@reduxjs/toolkit";
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
    removeMenuCategorie: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    addMenuCategorie: (state, action: PayloadAction<MenusCategories>) => {
      state.items = [...state.items, action.payload];
    },
    updateMenuCategorie: (state, action: PayloadAction<MenusCategories>) => {
      const { id } = action.payload;
      if (!id) console.log("cann't update menuCategories");
      const filter = state.items.filter((item) => item.id !== id);
      state.items = [...filter, action.payload];
    },
  },
});
export const {
  setMenuCategories,
  removeMenuCategorie,
  addMenuCategorie,
  updateMenuCategorie,
} = menuCategoriesSlice.actions;
export default menuCategoriesSlice.reducer;
