import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import Layout from "./Layout";
import { BackofficeContext } from "../contexts/BackofficeContext";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { config } from "@/config/config";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { menu_categories } from "@prisma/client";
interface newMenuCategories {
  name: string;
  selectedLocationIds: number[];
}
const MenuCategories = () => {
  const [newMenuCategories, setNewMenuCategories] = useState<newMenuCategories>(
    {
      name: "",
      selectedLocationIds: [],
    }
  );
  const [isUpdate, setIsUpdate] = useState(false);
  const [updatingId, setupdatingId] = useState<number | null>();
  const [selectedLocationIds, setSelectedLocationIds] = useState<number[]>([]);
  const [locationId, setLocationId] = useLocalStorage("locationId");
  const { menuCategories, fetchData, menusMenuCategoriesLocations, Locations } =
    useContext(BackofficeContext);

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
    if (
      !newMenuCategories.name ||
      !newMenuCategories.selectedLocationIds.length
    )
      return console.log("Insert Data");
    const response = await fetch(`${config.backofficeUrl}/menuCategories`, {
      method: "POST",
      body: JSON.stringify(newMenuCategories),
    });
    fetchData();
    setNewMenuCategories({ name: "", selectedLocationIds: [] });
    setSelectedLocationIds([]);
  }
  const validMenuCategoriesIds = menusMenuCategoriesLocations
    .filter((mcl) => mcl.locations_id === locationId)
    .map((mcl) => mcl.menu_categories_id);
  //use for menusCategories only for selected location
  // const actualMenuCategories = menuCategories.filter(
  //   (mc) => mc.id && validMenuCategoriesIds.includes(mc.id)
  // );
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
  const handleChange = (e: SelectChangeEvent<number[] | []>) => {
    const currentLocation = e.target.value as number[];
    setSelectedLocationIds(currentLocation);
    setNewMenuCategories({
      name: newMenuCategories.name ? newMenuCategories.name : "",
      selectedLocationIds: currentLocation,
    });
  };
  const selectedHandler = async (cat: menu_categories) => {
    window.scrollTo(0, 0);
    let menusMenucategoriesLocation = menusMenuCategoriesLocations.filter(
      (mcl) => mcl.menu_categories_id === cat.id
    );
    let locationIds = menusMenucategoriesLocation.map((l) => l.locations_id);
    locationIds = locationIds.filter(
      (value, index, array) => array.indexOf(value) === index
    );
    setIsUpdate(true);
    setupdatingId(cat.id);
    setNewMenuCategories({
      name: cat.name,
      selectedLocationIds: locationIds,
    });
    setSelectedLocationIds(locationIds);
  };
  return (
    <Layout title="MenuCategories">
      <Box>
        <Box
          sx={{
            mb: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 4,
            gap: 1,
            flexDirection: "column",
            flexWrap: "wrap",
          }}
        >
          <TextField
            label="New MenuCategories"
            variant="outlined"
            sx={{ mx: 3, width: "400px" }}
            value={newMenuCategories.name}
            onChange={(e) =>
              setNewMenuCategories({
                name: e.target.value,
                selectedLocationIds: selectedLocationIds,
              })
            }
          />
          {/* drop down  */}
          <FormControl sx={{ mb: 1, width: "400px" }} required>
            <InputLabel
              id="demo-multiple-checkbox-label"
              sx={{ backgroundColor: "white", px: 2 }}
            >
              Location (at least one)
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={selectedLocationIds}
              onChange={handleChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(value) => {
                const selectedLocation = selectedLocationIds.map(
                  (selectedLocation) => {
                    return Locations.find(
                      (menuCategory) => menuCategory.id === selectedLocation
                    );
                  }
                );
                return selectedLocation
                  .map((location) => location?.name)
                  .join(",");
              }}
            >
              {Locations.map((location) => (
                <MenuItem key={location.id} value={location.id}>
                  <Checkbox
                    checked={
                      location.id && selectedLocationIds.includes(location.id)
                        ? true
                        : false
                    }
                  />
                  <ListItemText primary={location.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* drop down end */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              onClick={() =>
                isUpdate
                  ? updateHandler(updatingId as number)
                  : createNewMenuCategories()
              }
              sx={{ height: "3rem", width: "150px" }}
            >
              {isUpdate ? "UPDATE" : "ADD"}
            </Button>
            {isUpdate && (
              <Button
                variant="outlined"
                color="error"
                sx={{ height: "3rem", width: "150px" }}
                onClick={() =>
                  updatingId
                    ? deleteHandler(updatingId)
                    : alert("cannot delete")
                }
              >
                Delete
              </Button>
            )}
          </Box>
        </Box>
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
                  width: "200px",
                  height: "200px",
                  boxShadow: "1px 0px 5px black",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
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
  async function updateHandler(id: number) {
    await fetch(`${config.backofficeUrl}/menuCategories?id=${id}`, {
      method: "PATCH",
      body: JSON.stringify(newMenuCategories),
    });
  }
  async function deleteHandler(id: number) {
    const response = await fetch(
      `${config.backofficeUrl}/menuCategories?id=${id}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      setNewMenuCategories({
        name: "",
        selectedLocationIds: [],
      });
      setSelectedLocationIds([]);
      setIsUpdate(false);
      fetchData();
      alert("Deleted");
    } else {
      setIsUpdate(false);
      alert("Error");
    }
  }
};

export default MenuCategories;
