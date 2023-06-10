import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Dialog,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Locations from "../../../components/Locations";
import { config } from "@/config/config";
import { BackofficeContext } from "@/contexts/BackofficeContext";
import { useRouter } from "next/router";
import { menus as Menu } from "@prisma/client";

interface menuCategories {
  name: string;
  selectedMenuIds: number[];
  selectedLocationIds: number[];
}
export default function EditMenuCategories() {
  const [updateMenuCategorie, setUpdateMenuCategorie] =
    useState<menuCategories>({
      name: "",
      selectedMenuIds: [],
      selectedLocationIds: [],
    });
  const [selectedLocations, setSelectedLocations] = useState<number[]>([]);
  const router = useRouter();
  const updatingId = parseInt(router.query.id as string);
  const {
    menuCategories,
    menus,
    fetchData,
    menusMenuCategoriesLocations,
    Locations,
  } = useContext(BackofficeContext);
  const menuMenuCategoriesLocationsIds = menusMenuCategoriesLocations.filter(
    (mcl) => mcl.menu_categories_id === updatingId
  );

  const menuIds = menuMenuCategoriesLocationsIds.map((mcl) => mcl.menus_id);
  const menuLocationIds = menuMenuCategoriesLocationsIds.map(
    (mcl) => mcl.locations_id
  );
  const selectedLocationIds = Locations.filter((location) =>
    menuLocationIds.includes(location.id)
  ).map((location) => location.id);
  const updatingMenuCategorie = menuCategories.filter(
    (mc) => mc.id === updatingId
  );
  const connectedMenus = menus.filter((menu) => menuIds.includes(menu.id));
  const connectedMenusIds = connectedMenus.map((menu) => menu.id);
  useEffect(() => {
    if (updatingMenuCategorie.length > 0) {
      setUpdateMenuCategorie({
        name: updatingMenuCategorie[0].name,
        selectedMenuIds: connectedMenusIds,
        selectedLocationIds: selectedLocationIds,
      });
      setSelectedLocations(selectedLocationIds);
    }
  }, [updatingMenuCategorie.length]);
  if (
    !connectedMenus.length &&
    !updatingMenuCategorie.length &&
    !selectedLocationIds.length
  ) {
    return null;
  }
  return (
    <Box>
      <Button
        onClick={() => router.push("./")}
        sx={{ marginLeft: 2, marginTop: 4, position: "fixed" }}
        variant="contained"
      >
        Back
      </Button>
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
        <Typography sx={{ marginBottom: 4, fontSize: "2rem" }}>
          Edit MenuCategories{" "}
        </Typography>
        <TextField
          label="New MenuCategories"
          variant="outlined"
          sx={{ mx: 3, width: "400px" }}
          value={updateMenuCategorie.name}
          onChange={(e) =>
            setUpdateMenuCategorie({
              name: e.target.value,
              selectedLocationIds: updateMenuCategorie.selectedLocationIds,
              selectedMenuIds: updateMenuCategorie.selectedMenuIds,
            })
          }
        />
        {/* drop down  */}
        <FormControl sx={{ mb: 1, width: "400px" }} required>
          <InputLabel
            id="demo-multiple-checkbox-label"
            sx={{ backgroundColor: "white", px: 2 }}
          >
            Location
          </InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={selectedLocations}
            onChange={handleChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(value) => {
              const selectedLocation = selectedLocations.map(
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
                    location.id && selectedLocations.includes(location.id)
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
            onClick={() => console.log("first")}
            sx={{ height: "3rem", width: "150px" }}
          >
            UPDATE
          </Button>

          <Button
            variant="outlined"
            color="error"
            sx={{ height: "3rem", width: "150px" }}
            onClick={() =>
              updatingId ? deleteHandler(updatingId) : alert("cannot delete")
            }
          >
            Delete
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {connectedMenus?.map((data, index) => {
          return (
            <section key={index} style={{ position: "relative" }}>
              <Box>
                <Card
                  sx={{
                    width: 300,
                    backgroundColor: "#E7EBF0",
                    height: 300,
                    marginTop: 3,
                  }}
                >
                  <CardContent>
                    <CardMedia
                      component="img"
                      height="194"
                      image={data.asseturl ? data.asseturl : ""}
                      alt="Paella dish"
                    />
                    <Typography gutterBottom variant="h5">
                      {data.name}
                      <span style={{ color: "red" }}>{data.price}</span>
                      <span style={{ fontSize: "18px" }}>Ks</span>
                    </Typography>
                    <Typography>{data.description}</Typography>
                  </CardContent>
                </Card>
              </Box>
              <Button
                variant="contained"
                color="error"
                sx={{
                  position: "absolute",
                  bottom: 4,
                  right: 4,
                }}
              >
                Remove
              </Button>
            </section>
          );
        })}
      </Box>
    </Box>
  );
  async function deleteHandler(id: number) {
    const response = await fetch(
      `${config.backofficeUrl}/menuCategories?id=${id}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      fetchData();
      alert("Deleted");
    } else {
      alert("Error");
    }
  }
  function handleChange(e: SelectChangeEvent<number[]>) {
    console.log(e.target.value);
    setUpdateMenuCategorie({
      ...updateMenuCategorie,
      selectedLocationIds: e.target.value as number[],
    });
    setSelectedLocations(e.target.value as number[]);
  }
}
// setUpdateMenuCategorie({
//   name: updatingMenuCategorie.length ? updatingMenuCategorie[0].name : "",
//   selectedMenuIds: selectedLocationIds ? selectedLocationIds : [],
// });
