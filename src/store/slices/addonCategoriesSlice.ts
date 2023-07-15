import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { addon_categories as AddonCategories } from "@prisma/client";
import { RootState } from "..";

interface AddonCategoriesType {
  isLoading: boolean;
  items: AddonCategories[];
  error: null | Error;
}
const initialState: AddonCategoriesType = {
  isLoading: false,
  items: [],
  error: null,
};
export const addonCategoriesSlice = createSlice({
  name: "addonCategories",
  initialState,
  reducers: {
    setAddonCategories: (state, action) => {
      state.items = action.payload;
    },
    addAddonCategories: (state, action: PayloadAction<AddonCategories>) => {
      state.items = [...state.items, action.payload];
    },
    removeAddonCAtegories: (state, action: PayloadAction<AddonCategories>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});
export const { setAddonCategories, addAddonCategories, removeAddonCAtegories } =
  addonCategoriesSlice.actions;
export default addonCategoriesSlice.reducer;
