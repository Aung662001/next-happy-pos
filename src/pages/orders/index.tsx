import { OrderContext } from "@/contexts/OrderContext";
import { MenuCategory } from "@/typings/types";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import { menus as Menu } from "@prisma/client";
import MenuCard from "@/components/MenuCard";
import CartIcon from "@/components/CartIcon";
import { useAppSelector } from "@/store/hook";
import { AppData } from "@/store/slices/appSlice";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function Order() {
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [value, setValue] = React.useState(0);
  const router = useRouter();
  const { locationId, tableId } = router.query;
  const { menuCategories, menus, menusMenuCategoriesLocations, orderLines } =
    useAppSelector(AppData);
  const [selectedMenuCategory, setSelectedMenuCategories] =
    useState<MenuCategory[]>();
  const [selectedMenuCategoriesId, setSelectedMenuCategoriesId] =
    useState<number>();
  console.log(selectedMenuCategoriesId);
  useEffect(() => {
    menuCategories.length && setSelectedMenuCategoriesId(menuCategories[0].id);
  }, [menuCategories]);

  const MenuIdsRelatedToMenuCategories = menusMenuCategoriesLocations
    .filter((mcl) => mcl.menu_categories_id === selectedMenuCategoriesId)
    .filter((data) => data.menus_id !== null)
    .map((filteredIds) => filteredIds.menus_id);
  const filteredMenus = menus.filter((menu) =>
    MenuIdsRelatedToMenuCategories.includes(menu.id)
  );
  const clickHandler = (menu: Menu) => {
    router.push({
      pathname: `./orders/menu/${menu.id}`,
      query: `locationId=${locationId}&tableId=${tableId}`,
    });
  };
  return (
    <Box>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            position: "fixed",
            top: 0,
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <Tab label={`All`} {...a11yProps(0)} />
            {menuCategories.map((menuCategorie) => {
              return (
                <Tab
                  label={`${menuCategorie.name}`}
                  {...a11yProps(0)}
                  key={menuCategorie.id}
                  onClick={() => setSelectedMenuCategoriesId(menuCategorie.id)}
                />
              );
            })}
          </Tabs>
        </Box>
        {/* ///////////rendered//////////// */}
        {/* {menuCategories.map((menuCategorie, index) => { */}
        {/* return ( */}
        {/* <TabPanel value={value} index={index} key={index}>
               {menuCategorie.name}

             </TabPanel> */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 4,
            flexWrap: "wrap",
            margin: "2rem",
          }}
        >
          {value === 0 &&
            menus.map((menu) => {
              return (
                <MenuCard key={menu.id} callback={clickHandler} data={menu} />
              );
            })}
          {value !== 0 &&
            filteredMenus.map((menu) => {
              return (
                <MenuCard callback={clickHandler} data={menu} key={menu.id} />
              );
            })}
        </Box>
        {orderLines.length && <CartIcon />}
      </Box>
    </Box>
  );
}

export default Order;

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
