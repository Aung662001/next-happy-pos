import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { menus_menu_categories_locations as MenusMenuCategoriesLocation } from "@prisma/client";
import { config } from "@/config/config";
import { setMenu } from "./menuSlice";

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
export const fetchMenuMenuCategoriesLocation = createAsyncThunk(
  "menuMenuCategoriesLocation/fetchMenuMenuCategoriesLocation",
  async (state, thunkAPI) => {
    thunkAPI.dispatch(setIsLoading(true));

    const data = await fetch(
      `${config.backofficeUrl}/menuMenuCategoriesLocation`,
      {
        method: "GET",
      }
    );
    if (data) {
      const menuMenuCategoriesLocation = await data.json();
      thunkAPI.dispatch(setIsLoading(false));
      thunkAPI.dispatch(
        setMenusMenuCategoriesLocation(menuMenuCategoriesLocation)
      );
    }
  }
);
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
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});
export const {
  setMenusMenuCategoriesLocation,
  addMenusMenuCategoriesLocation,
  removeMenusMenuCategoriesLocation,
  setIsLoading,
} = menusMenuCategoriesLocationSlice.actions;
export default menusMenuCategoriesLocationSlice.reducer;
