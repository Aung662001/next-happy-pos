import React, { useContext, useState } from "react";
import Layout from "@/components/Layout";
import CreateMenuCategories from "@/components/editMenuCategories/CreateMenuCategories";
// import { BackofficeContext } from "@/contexts/BackofficeContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Box, Button, Grid } from "@mui/material";
import { menu_categories } from "@prisma/client";
import { useRouter } from "next/router";
import ItemCard from "@/components/ItemCard";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import { useAppSelector } from "@/store/hook";
import { AppData } from "@/store/slices/appSlice";

export interface newMenuCategories {
  name: string;
  selectedLocationIds: number[] | null;
}
const App = () => {
  const router = useRouter();
  const [newMenuCategories, setNewMenuCategories] = useState<newMenuCategories>(
    {
      name: "",
      selectedLocationIds: [],
    }
  );
  const [isUpdate, setIsUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [updatingId, setupdatingId] = useState<number | null>();
  const [selectedLocationIds, setSelectedLocationIds] = useState<number[]>([]);
  const [locationId] = useLocalStorage("locationId");
  const { menuCategories, menusMenuCategoriesLocations, Locations } =
    useAppSelector(AppData);
  const validMenuCategoriesIds = menusMenuCategoriesLocations
    .filter((mcl) => mcl.locations_id === parseInt(locationId))
    .map((mcl) => mcl.menu_categories_id);

  const getConnectedMenus = (catId: number) => {
    let count = 0;
    menusMenuCategoriesLocations.map((m) => {
      if (m.locations_id === parseInt(locationId)) {
        if (m.menu_categories_id === catId) {
          if (m.menus_id !== null) {
            return count++;
          } else {
            return count;
          }
        } else {
          return count;
        }
      } else {
        return count;
      }
    });

    return count;
  };
  const selectedHandler = async (cat: menu_categories) => {
    router.push(`menu-categories/${cat.id}`);
  };
  const menuCategoriesIdsWithLocation = menusMenuCategoriesLocations
    .filter((mcl) => mcl.locations_id === parseInt(locationId))
    .map((mclIds) => mclIds.menu_categories_id);
  const filteredMenuCategories = menuCategories.filter((menuCategorie) =>
    menuCategoriesIdsWithLocation.includes(menuCategorie.id)
  );
  return (
    <Layout title="MenuCategories">
      <Box>
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          sx={{ position: "absolute", right: 0 }}
        >
          Add New MenuCategories +
        </Button>
        <CreateMenuCategories
          open={open}
          setOpen={setOpen}
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
          updatingId={updatingId}
          setUpdationgId={setupdatingId}
          newMenuCategories={newMenuCategories}
          setNewMenuCategories={setNewMenuCategories}
          selectedLocationIds={selectedLocationIds}
          setSelectedLocationIds={setSelectedLocationIds}
        />
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          gap={3}
        >
          {filteredMenuCategories.map((cat, index) => {
            return (
              <Box key={index} onClick={() => selectedHandler(cat)}>
                <ItemCard
                  icon={
                    <DinnerDiningIcon
                      sx={{ color: "#208469", fontSize: "2rem" }}
                    />
                  }
                  childName="Menus"
                  name={cat.name}
                  itemCount={getConnectedMenus(cat.id)}
                />
              </Box>
              // </Box>
            );
          })}
        </Grid>
      </Box>
    </Layout>
  );
};

export default App;
