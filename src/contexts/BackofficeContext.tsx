import { createContext, useEffect } from "react";

import {
  addons as Addon,
  addon_categories as AddonCategory,
  menus as Menu,
  menu_categories as MenuCategory,
  menus_menu_categories_locations as MenusMenuCategoriesLocation,
  locations as Location,
  companies as Company,
  menus_addon_categories as menuAddonCategories,
  tables as Tables,
  orders as Orders,
  orderLine as OrderLine,
} from "@prisma/client";
import { useState } from "react";
import { config } from "../config/config";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
export interface BackofficeContextType {
  menus: Menu[];
  menuCategories: MenuCategory[];
  addons: Addon[];
  menuAddonCategories: menuAddonCategories[];
  addonCategories: AddonCategory[];
  menusMenuCategoriesLocations: MenusMenuCategoriesLocation[];
  Locations: Location[];
  companies: Company[];
  tables: Tables[];
  updateData: (data: any) => void;
  fetchData: () => void;
  orders: Orders[];
  orderLines: OrderLine[];
  loading: boolean;
}

const defaultContext: BackofficeContextType = {
  menus: [],
  menuCategories: [],
  addons: [],
  addonCategories: [],
  menusMenuCategoriesLocations: [],
  menuAddonCategories: [],
  Locations: [],
  companies: [],
  tables: [],
  updateData: () => {},
  fetchData: () => {},
  orders: [],
  orderLines: [],
  loading: true,
};
export const BackofficeContext =
  createContext<BackofficeContextType>(defaultContext);

const BackofficeProvider = (props: any) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [location, setLocation] = useLocalStorage("locationId");

  const [data, updateData] = useState(defaultContext);
  useEffect(() => {
    if (session) {
      // setToken(sessionn);
      fetchData();
    }
  }, [session]);
  const fetchData = async () => {
    const response = await fetch(`${config.backofficeUrl}/appData`, {});
    if (!response.ok) return null;
    const responseJson = await response.json();
    const {
      menus,
      menuCategories,
      addons,
      addonCategories,
      menusMenuCategoriesLocations,
      Locations,
      companies,
      menuAddonCategories,
      tables,
      orders,
      orderLines,
    } = responseJson;
    updateData({
      ...data,
      menus,
      menuCategories,
      addons,
      addonCategories,
      menusMenuCategoriesLocations,
      Locations,
      companies,
      menuAddonCategories,
      tables,
      loading: false,
      orders,
      orderLines,
    });
    location ?? setLocation(Locations[0].id);
  };

  return (
    <BackofficeContext.Provider value={{ ...data, updateData, fetchData }}>
      {props.children}
    </BackofficeContext.Provider>
  );
};

export default BackofficeProvider;
