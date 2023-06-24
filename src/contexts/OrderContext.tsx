import { createContext, useEffect } from "react";

import {
  addons as Addon,
  addon_categories as AddonCategory,
  menus as Menu,
  menu_categories as MenuCategory,
  locations as Location,
  companies as Company,
  menus_menu_categories_locations as MenusMenuCategoriesLocation,
  menus_addon_categories as MenusAddonCategories,
} from "@prisma/client";
import { Order, OrderLine } from "@/typings/types";
import { useState } from "react";
import { config } from "../config/config";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
export interface OrderContextType {
  menus: Menu[];
  menuCategories: MenuCategory[];
  addons: Addon[];
  addonCategories: AddonCategory[];
  Locations: Location[];
  menuAddonCategories: MenusAddonCategories[];
  cart: Order[] | null;
  menusMenuCategoriesLocations: MenusMenuCategoriesLocation[];
  updateData: (data: any) => void;
  fetchData: () => void;
  orderLines: OrderLine[];
}

const defaultContext: OrderContextType = {
  menus: [],
  menuCategories: [],
  addons: [],
  addonCategories: [],
  menusMenuCategoriesLocations: [],
  Locations: [],
  menuAddonCategories: [],
  cart: [],
  updateData: () => {},
  fetchData: () => {},
  orderLines: [],
};
export const OrderContext = createContext<OrderContextType>(defaultContext);
const OrderProvider = (props: any) => {
  const router = useRouter();
  const locationId = router.query.locationId;
  const [data, updateData] = useState(defaultContext);
  useEffect(() => {
    if (locationId) {
      fetchData();
    }
  }, [locationId]);
  const fetchData = async () => {
    const response = await fetch(
      `${config.orderBaseUrl}?locationId=${locationId}`,
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
      menuAddonCategories,
    } = responseJson;
    updateData({
      ...data,
      menus,
      menuCategories,
      menusMenuCategoriesLocations,
      addons,
      addonCategories,
      Locations,
      menuAddonCategories,
    });
  };
  return (
    <OrderContext.Provider value={{ ...data, updateData, fetchData }}>
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
