import { config } from "../../../config/config";
import React, { useEffect } from "react";

function Menu() {
  const fetchMenu = async () => {
    await fetch(`${config.apiUrl}/api/menus`);
  };
  useEffect(() => {
    fetchMenu();
  }, []);
  return <div>Menu</div>;
}

export default Menu;
