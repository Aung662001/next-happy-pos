import React, { useContext, useState } from "react";
import Layout from "@/components/Layout";
import CreateMenuCategories from "@/components/editMenuCategories/CreateMenuCategories";
import { BackofficeContext } from "@/contexts/BackofficeContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Box, Button } from "@mui/material";
import { menu_categories } from "@prisma/client";
import { useRouter } from "next/router";

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
  const { menuCategories, fetchData, menusMenuCategoriesLocations, Locations } =
    useContext(BackofficeContext);
  const validMenuCategoriesIds = menusMenuCategoriesLocations
    .filter((mcl) => mcl.locations_id === locationId)
    .map((mcl) => mcl.menu_categories_id);

  const getConnectedMenus = (catId: number) => {
    let count = 0;
    menusMenuCategoriesLocations.map((m) => {
      if (m.locations_id === locationId) {
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
    .filter((mcl) => mcl.locations_id === locationId)
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {filteredMenuCategories.map((cat, index) => {
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
                <p
                  style={{
                    fontSize: "1.5rem",
                    flexWrap: "wrap",
                    lineBreak: "anywhere",
                  }}
                >
                  {cat.name}
                </p>
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

export default App;
