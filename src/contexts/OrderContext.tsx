import { createContext, useEffect } from "react";

import {
  addons as Addon,
  addon_categories as AddonCategory,
  menus as Menu,
  menu_categories as MenuCategory,
  locations as Location,
  companies as Company,
  menus_menu_categories_locations as MenusMenuCategoriesLocation,
} from "@prisma/client";
import { Order } from "@/typings/types";
import { useState } from "react";
import { config } from "../config/config";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
export interface OrderContextType {
  menus: Menu[];
  menuCategories: MenuCategory[];
  addons: Addon[];
  addonCategories: AddonCategory[];
  Locations: Location[];
  accessToken: string;
  token: string;
  cart: Order[] | null;
  menusMenuCategoriesLocations: MenusMenuCategoriesLocation[];
  updateData: (data: any) => void;
  fetchData: () => void;
}

const defaultContext: OrderContextType = {
  menus: [],
  menuCategories: [],
  addons: [],
  addonCategories: [],
  menusMenuCategoriesLocations: [],
  Locations: [],
  accessToken: "",
  token: "",
  cart: [],
  updateData: () => {},
  fetchData: () => {},
};
export const OrderContext = createContext<OrderContextType>(defaultContext);

const OrderProvider = (props: any) => {
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
    const response = await fetch(
      `${config.orderUrl}?locationId=${location}`,
      {}
    );
    if (!response.ok) return null;
    const responseJson = await response.json();
    const {
      menus,
      menuCategories,
      addons,
      addonCategories,
      Locations,
      menusMenuCategoriesLocations,
    } = responseJson;
    updateData({
      ...data,
      menus,
      menuCategories,
      menusMenuCategoriesLocations,
      addons,
      addonCategories,
      Locations,
    });
    Locations && setLocation(Locations[0].id);
  };
  return (
    <OrderContext.Provider value={{ ...data, updateData, fetchData }}>
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
