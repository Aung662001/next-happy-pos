import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import Layout from "./Layout";
import { BackofficeContext } from "../contexts/BackofficeContext";
import { Box, Button, Chip, TextField } from "@mui/material";
import { config } from "@/config/config";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const MenuCategories = () => {
  const [newMenuCategories, setNewMenuCategories] = useState("");
  const [locationId, setLocationId] = useLocalStorage("locationId");
  const { menuCategories, fetchData, menusMenuCategoriesLocations } =
    useContext(BackofficeContext);
  console.log(menuCategories);
  useEffect(() => {
    setNewMenuCategories(""); // Clear the state when the component mounts on the client side
  }, []);

  async function deleteMenuCategories(id: number) {
    const response = await fetch(
      `${config.backofficeUrl}/menuCategories/${id}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      alert("Please delete relation menus");
    }
    fetchData();
  }
  async function createNewMenuCategories() {
    const response = await fetch(`${config.backofficeUrl}/menuCategories`, {
      method: "POST",
      body: newMenuCategories,
    });
    setNewMenuCategories("");
    fetchData();
  }
  const validMenuCategoriesIds = menusMenuCategoriesLocations
    .filter((mcl) => mcl.locations_id === locationId)
    .map((mcl) => mcl.menu_categories_id);
  const actualMenuCategories = menuCategories.filter(
    (mc) => mc.id && validMenuCategoriesIds.includes(mc.id)
  );
  return (
    <Layout>
      <Box>
        <Box sx={{ mb: 2, display: "flex", justifyContent: "center", mt: 4 }}>
          <TextField
            label="New MenuCategories"
            variant="outlined"
            sx={{ mx: 3 }}
            value={newMenuCategories}
            onChange={(e) => setNewMenuCategories(e.target.value)}
          />
          <Button variant="contained" onClick={() => createNewMenuCategories()}>
            ADD
          </Button>
        </Box>

        {actualMenuCategories.map((cat, index) => {
          return (
            <Box sx={{ margin: "10px" }} key={index}>
              <Chip
                label={cat.name}
                sx={{ mr: 1, mb: 2, cursor: "pointer" }}
                onDelete={() => {
                  cat.id && deleteMenuCategories(cat.id);
                }}
              />
            </Box>
          );
        })}
      </Box>
    </Layout>
  );
};

export default MenuCategories;
