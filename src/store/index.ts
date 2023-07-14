import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./slices/appSlice";
import menuSlice from "./slices/menuSlice";
import addonSlice from "./slices/addonsSlice";
import menuCategoriesSlice from "./slices/menuCategoriesSlict";
import menusMenuCategoriesLocationSlice from "./slices/menusMenuCategoriesLocationSlice";
import addonCategoriesSlice from "./slices/addonCategoriesSlice";
import menusAddonCategories from "./slices/menuAddonCategoriesSlice";
export const store = configureStore({
  reducer: {
    app: appSlice,
    menus: menuSlice,
    addons: addonSlice,
    menuCategories: menuCategoriesSlice,
    menusMenuCategoriesLocation: menusMenuCategoriesLocationSlice,
    addonCategories: addonCategoriesSlice,
    menusAddonCategories: menusAddonCategories,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
