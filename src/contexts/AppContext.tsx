import { createContext, useEffect } from "react";

import {
  Addon,
  AddonCategory,
  Menu,
  MenuCategory,
  MenusLocation,
  Location,
  Company,
} from "../typings/types";
import { useState } from "react";
import { config } from "../config/config";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
export interface AppContextType {
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
}

const defaultContext: AppContextType = {
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
};
export const AppContext = createContext<AppContextType>(defaultContext);

const AppProvider = (props: any) => {
  const router = useRouter();
  const { data: session } = useSession();
  // token &&
  //   setTimeout(() => {
  //     console.log("expired");
  //     localStorage.setItem("accessToken", "");
  //     window.location.href = "/login";
  //   }, 6000 * 60);

  const [data, updateData] = useState(defaultContext);
  useEffect(() => {
    if (session) {
      // setToken(sessionn);
      fetchData();
    }
  }, [session]);
  const fetchData = async () => {
    const response = await fetch(`${config.apiUrl}`, {});
    if (!response.ok) return null;
    const responseJson = await response.json();
    console.log(responseJson);
    // const {
    //   menus,
    //   menuCategories,
    //   addons,
    //   addonCategories,
    //   menusLocations,
    //   Locations,
    //   companies,
    // } = responseJson;
    // updateData({
    //   ...data,
    //   menus,
    //   menuCategories,
    //   addons,
    //   addonCategories,
    //   menusLocations,
    //   Locations,
    //   companies,
    // });
  };
  return (
    <AppContext.Provider value={{ ...data, updateData, fetchData }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
