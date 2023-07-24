import Layout from "@/components/Layout";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import FastfoodIcon from "@mui/icons-material/Fastfood";

import {
  Button,
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { addon_categories } from "@prisma/client";
import React, { useContext, useState } from "react";
import EditAddonCategories from "./Edit";
import ItemCard from "@/components/ItemCard";
import { useAppSelector } from "@/store/hook";
import { AppData } from "@/store/slices/appSlice";
// import AddonCategories from "@/components/AddonCategories";

interface AddonCategories {
  id: null | number;
  name: string;
  isRequired: string;
}
const App = () => {
  const {
    addonCategories: addonCategoriesFromContext,
    menusMenuCategoriesLocations,
    menuAddonCategories,
    addons,
  } = useAppSelector(AppData);
  const [locationId] = useLocalStorage("locationId");
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [addonCategories, setAddonCategories] = useState<AddonCategories>({
    id: null,
    name: "",
    isRequired: "false",
  });
  const menuIds = menusMenuCategoriesLocations
    .filter((mcl) => mcl.locations_id === parseInt(locationId))
    .map((mclIds) => mclIds.menus_id);
  const addonCategorieIds = menuAddonCategories
    .filter((menuAddonCategorie) =>
      menuIds.includes(menuAddonCategorie.menus_id)
    )
    .map((ids) => ids.addon_categories_id);
  const filteredAddonCategories = addonCategoriesFromContext.filter(
    (addonCate) => addonCategorieIds.includes(addonCate.id)
  );
  let itemCount = (id: number) => {
    return addons.filter((addon) => addon.addon_categories_id === id).length;
  };
  return (
    <Layout title="AddonCategories">
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        sx={{ position: "absolute", right: 0 }}
      >
        Add New AddonCategories +
      </Button>

      <EditAddonCategories
        open={open}
        setOpen={setOpen}
        setAddonCategories={setAddonCategories}
        addonCategories={addonCategories}
        update={update}
        setUpdate={setUpdate}
      />
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        gap={3}
      >
        {/* {can use to filter =>filteredAddonCategories} */}
        {addonCategoriesFromContext?.map((data, index) => {
          return (
            <section key={index}>
              <Box onClick={() => clickHandle(data)}>
                <ItemCard
                  name={data.name}
                  icon={
                    <FastfoodIcon sx={{ color: "#208469", fontSize: "2rem" }} />
                  }
                  childName="Addons"
                  itemCount={itemCount(data.id)}
                />
              </Box>
            </section>
          );
        })}
      </Grid>
    </Layout>
  );

  function clickHandle(data: addon_categories) {
    setAddonCategories({
      id: data.id,
      name: data.name,
      isRequired: data.is_required === true ? "true" : "false",
    });
    setUpdate(true);
    setOpen(true);
  }
};

export default App;
