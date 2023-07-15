import { config } from "@/config/config";
import { Apps } from "@mui/icons-material";
import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { setMenu } from "./menuSlice";
import { setAddons } from "./addonsSlice";
import { setMenuCategories } from "./menuCategoriesSlict";
import { setMenusMenuCategoriesLocation } from "./menusMenuCategoriesLocationSlice";
import { setAddonCategories } from "./addonCategoriesSlice";
import { setMenusAddonCategories } from "./menuAddonCategoriesSlice";
import { setLocation } from "./locationSlice";
import { setCompanies } from "./companiesSlice";
import { setTables } from "./tableSlice";
import { setOrders } from "./orderSlice";
import { setOrderLines } from "./orderLineSlice";
import { RootState } from "..";

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
    if (jsonData) thunkAPI.dispatch(setAppLoading(false));
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
    thunkAPI.dispatch(setMenu(menus));
    thunkAPI.dispatch(setAddons(addons));
    thunkAPI.dispatch(setMenuCategories(menuCategories));
    thunkAPI.dispatch(
      setMenusMenuCategoriesLocation(menusMenuCategoriesLocations)
    );
    thunkAPI.dispatch(setAddonCategories(addonCategories));
    thunkAPI.dispatch(setMenusAddonCategories(menuAddonCategories));
    thunkAPI.dispatch(setLocation(Locations));
    thunkAPI.dispatch(setCompanies(companies));
    thunkAPI.dispatch(setTables(tables));
    thunkAPI.dispatch(setOrders(orders));
    thunkAPI.dispatch(setOrderLines(orderLines));
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
const selectAllmenus = (state: RootState) => state.menus.items;
const selectAllLocations = (state: RootState) => state.locations.items;
const selectAlladdons = (state: RootState) => state.addons.items;
const selectAlladdonCategories = (state: RootState) =>
  state.addonCategories.items;
const selectAllmenuCategories = (state: RootState) =>
  state.menuCategories.items;
const selectAllmenuAddonCategories = (state: RootState) =>
  state.menusAddonCategories.items;
const selectAllmenusMenuCategoriesLocations = (state: RootState) =>
  state.menusMenuCategoriesLocation.items;
const selectAllcompanies = (state: RootState) => state.companies.items;
const selectAlltables = (state: RootState) => state.tables.items;
const selectAllorders = (state: RootState) => state.orders.items;
const selectAllorderLines = (state: RootState) => state.orderLines.items;
export const AppData = createSelector(
  [
    selectAllmenus,
    selectAllLocations,
    selectAlladdons,
    selectAlladdonCategories,
    selectAllmenuCategories,
    selectAllmenuAddonCategories,
    selectAllmenusMenuCategoriesLocations,
    selectAllcompanies,
    selectAlltables,
    selectAllorders,
    selectAllorderLines,
  ],
  (
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
    orderLines
  ) => {
    return {
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
    };
  }
);
export const { setAppLoading } = appSlice.actions;
export const selectIsLoading = (state: RootState) => state.app.isLoading;
export default appSlice.reducer;
