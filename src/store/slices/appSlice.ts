import { config } from "@/config/config";
import { Apps } from "@mui/icons-material";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMenu } from "./menuSlice";
import { setAddons } from "./addonsSlice";
import { setMenuCategories } from "./menuCategoriesSlict";
import { setMenusMenuCategoriesLocation } from "./menusMenuCategoriesLocationSlice";
import { setAddonCategories } from "./addonCategoriesSlice";
import { setMenusAddonCategories } from "./menuAddonCategoriesSlice";

interface AppState {
  isLoading: boolean;
  error: null | Error;
}
const initialState: AppState = {
  isLoading: false,
  error: null,
};
export const fetchAppData = createAsyncThunk(
  "app/fetchAppData",
  async (locationId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppLoading(true));

    const response = await fetch(
      `${config.backofficeUrl}/appData?locationId=${locationId}`
    );
    const jsonData = await response.json();
    const {
      menus,
      Locations,
      addons,
      addonCategories,
      menuCategories,
      menuAddonCategories,
      menusMenuCategoriesLocations,
      companies,
      tables,
      orders,
      orderLines,
    } = jsonData;
    console.log(addons);
    thunkAPI.dispatch(setMenu(menus));
    thunkAPI.dispatch(setAddons(addons));
    thunkAPI.dispatch(setMenuCategories(menuCategories));
    thunkAPI.dispatch(
      setMenusMenuCategoriesLocation(menusMenuCategoriesLocations)
    );
    thunkAPI.dispatch(setAddonCategories(addonCategories));
    thunkAPI.dispatch(setMenusAddonCategories(menuAddonCategories));
  }
);
export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});
export const { setAppLoading } = appSlice.actions;
export default appSlice.reducer;
