import { createContext, useEffect } from "react";

import {
  Addon,
  AddonCategory,
  Menu,
  MenuCategory,
  MenusLocation,
  Location,
  Company,
  Order,
} from "../typings/types";
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
  menusLocations: MenusLocation[];
  Locations: Location[];
  companies: Company[];
  updateData: (data: any) => void;
  fetchData: () => void;
  accessToken: string;
  token: string;
  cart: Order[];
}

const defaultContext: OrderContextType = {
  menus: [],
  menuCategories: [],
  addons: [],
  addonCategories: [],
  menusLocations: [],
  Locations: [],
  companies: [],
  updateData: () => {},
  fetchData: () => {},
  accessToken: "",
  token: "",
  cart: [],
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
    const response = await fetch(`${config.orderUrl}`, {});
    if (!response.ok) return null;
    const responseJson = await response.json();
    const {
      menus,
      menuCategories,
      addons,
      addonCategories,
      menusLocations,
      Locations,
      companies,
    } = responseJson;
    updateData({
      ...data,
      menus,
      menuCategories,
      addons,
      addonCategories,
      menusLocations,
      Locations,
      companies,
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
