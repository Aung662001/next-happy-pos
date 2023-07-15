import { createSlice } from "@reduxjs/toolkit";
import { addon_categories as AddonCategories } from "@prisma/client";

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
  },
});
export const { setAddonCategories } = addonCategoriesSlice.actions;
export default addonCategoriesSlice.reducer;
