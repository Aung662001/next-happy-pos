import { createContext, useEffect } from "react";

import {
  addons as Addon,
  addon_categories as AddonCategory,
  menus as Menu,
  menu_categories as MenuCategory,
  menus_menu_categories_locations as MenusMenuCategoriesLocation,
  locations as Location,
  companies as Company,
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
  addonCategories: AddonCategory[];
  menusMenuCategoriesLocations: MenusMenuCategoriesLocation[];
  Locations: Location[];
  companies: Company[];
  updateData: (data: any) => void;
  fetchData: () => void;
  accessToken: string;
  token: string;
}

const defaultContext: BackofficeContextType = {
  menus: [],
  menuCategories: [],
  addons: [],
  addonCategories: [],
  menusMenuCategoriesLocations: [],
  Locations: [],
  companies: [],
  updateData: () => {},
  fetchData: () => {},
  accessToken: "",
  token: "",
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
    });
    setLocation(Locations[0].id);
  };
  return (
    <BackofficeContext.Provider value={{ ...data, updateData, fetchData }}>
      {props.children}
    </BackofficeContext.Provider>
  );
};

export default BackofficeProvider;
