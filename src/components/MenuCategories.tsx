import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import Layout from "./Layout";
import { BackofficeContext } from "../contexts/BackofficeContext";
import { Box, Button } from "@mui/material";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { menu_categories } from "@prisma/client";
import EditMenuCategories from "./editMenuCategories/EditMenuCategories";
export interface newMenuCategories {
  name: string;
  selectedLocationIds: number[] | null;
}
const MenuCategories = () => {
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
  const [locationId, setLocationId] = useLocalStorage("locationId");
  const { menuCategories, fetchData, menusMenuCategoriesLocations, Locations } =
    useContext(BackofficeContext);
  const validMenuCategoriesIds = menusMenuCategoriesLocations
    .filter((mcl) => mcl.locations_id === locationId)
    .map((mcl) => mcl.menu_categories_id);

  const getConnectedMenus = (catId: number) => {
    let count = 0;
    menusMenuCategoriesLocations.map((m) => {
      if (m.menu_categories_id === catId) {
        if (m.menus_id !== null) {
          return count++;
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
    setOpen(true);
    let menusMenucategoriesLocation = menusMenuCategoriesLocations.filter(
      (mcl) => mcl.menu_categories_id === cat.id
    );
    let locationIds = menusMenucategoriesLocation.map((l) => l.locations_id);
    locationIds = locationIds.filter(
      (value, index, array) => array.indexOf(value) === index
    );
    locationIds = locationIds.filter((locationId) => locationId !== null);
    setIsUpdate(true);
    setupdatingId(cat.id);
    setNewMenuCategories({
      name: cat.name,
      selectedLocationIds: locationIds as number[],
    });
    setSelectedLocationIds(locationIds as number[]);
  };
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
        <EditMenuCategories
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {menuCategories.map((cat, index) => {
            return (
              <Box
                key={index}
                onClick={() => selectedHandler(cat)}
                sx={{
                  cursor: "pointer",
                  width: "200px",
                  height: "200px",
                  boxShadow: "1px 0px 5px black",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "4rem",
                }}
              >
                <p style={{ fontSize: "2rem" }}> {cat.name}</p>
                {getConnectedMenus(cat.id)} Menus
              </Box>
              // </Box>
            );
          })}
        </Box>
      </Box>
    </Layout>
  );
};

export default MenuCategories;
