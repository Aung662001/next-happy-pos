import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./slices/appSlice";
import menuSlice from "./slices/menuSlice";
import addonSlice from "./slices/addonsSlice";
import menuCategoriesSlice from "./slices/menuCategoriesSlict";
import menusMenuCategoriesLocationSlice from "./slices/menusMenuCategoriesLocationSlice";
import addonCategoriesSlice from "./slices/addonCategoriesSlice";
import menusAddonCategories from "./slices/menuAddonCategoriesSlice";
import companiesSlice from "./slices/companiesSlice";
import locationsSlice from "./slices/locationSlice";
import orderLinesSlice from "./slices/orderLineSlice";
import orderSlice from "./slices/orderSlice";
import tableSlice from "./slices/tableSlice";

export const store = configureStore({
  reducer: {
    app: appSlice,
    menus: menuSlice,
    addons: addonSlice,
    menuCategories: menuCategoriesSlice,
    menusMenuCategoriesLocation: menusMenuCategoriesLocationSlice,
    addonCategories: addonCategoriesSlice,
    menusAddonCategories: menusAddonCategories,
    companies: companiesSlice,
    locations: locationsSlice,
    orderLines: orderLinesSlice,
    orders: orderSlice,
    tables: tableSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
