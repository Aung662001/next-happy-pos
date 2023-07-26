import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
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
import React, { useContext, useEffect, useState } from "react";
import { config } from "@/config/config";
import { useRouter } from "next/router";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import DeleteDialog from "@/components/DeleteDialog";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { AppData } from "@/store/slices/appSlice";
import { removeMenuCategorie } from "@/store/slices/menuCategoriesSlict";
import { updateMenuCategorie as updateMenuCategoriesFromSlice } from "@/store/slices/menuCategoriesSlict";
import { fetchMenuMenuCategoriesLocation } from "@/store/slices/menusMenuCategoriesLocationSlice";

interface menuCategories {
  name: string;
  selectedMenuIds: number[];
  selectedLocationIds: number[];
}
export default function EditMenuCategories() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const updatingId = parseInt(router.query.id as string);
  const [open, setOpen] = useState(false);
  let [locationId] = useLocalStorage("locationId");
  const [updateMenuCategorie, setUpdateMenuCategorie] =
    useState<menuCategories>({
      name: "",
      selectedMenuIds: [],
      selectedLocationIds: [],
    });
  const [selectedLocations, setSelectedLocations] = useState<number[]>([]);
  const [chooseToConnectMenuIds, setChooseToConnectMenuIds] = useState<
    number[]
  >([]);
  const { menuCategories, menus, menusMenuCategoriesLocations, Locations } =
    useAppSelector(AppData);
  const allMenusIds = menus.map((menu) => menu.id);
  const menuMenuCategoriesLocationsIds = menusMenuCategoriesLocations.filter(
    (mcl) => mcl.menu_categories_id === updatingId
  );

  const menuIds = menuMenuCategoriesLocationsIds
    .filter((mcl) => mcl.locations_id === parseInt(locationId))
    .map((allids) => allids.menus_id);
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
  const notConnectedMenus = menus.filter(
    (menu) => !connectedMenusIds.includes(menu.id)
  );
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
  const deleteHandler = async () => {
    const response = await fetch(
      `${config.backofficeUrl}/menuCategories?id=${updatingId}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      setOpen(false);
      router.push("./");
      dispatch(removeMenuCategorie(updatingId));
    } else {
      alert("Cann't delete this MenuCategories");
    }
  };
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "20px ",
        }}
      >
        <Button
          onClick={() => router.push("./")}
          // sx={{ marginLeft: 2, marginTop: 4, position: "fixed" }}
          variant="contained"
        >
          Back
        </Button>
        <Button
          onClick={() => setOpen(true)}
          sx={{ display: "flex" }}
          variant="contained"
          color="error"
        >
          Delete
        </Button>
      </Box>
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        callback={deleteHandler}
        title={`Do You Really Want to Delete   ${updateMenuCategorie.name}`}
      />
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
            onClick={() => updateMenuCategories(updatingId)}
            sx={{ height: "3rem", width: "150px" }}
          >
            UPDATE
          </Button>
        </Box>
        {/*   connect to menus section ///////////////////////////////////*/}
        <Box sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
          <FormControl sx={{ mb: 1, width: "400px" }} required>
            <InputLabel
              id="demo-multiple-checkbox-label"
              sx={{ backgroundColor: "white", px: 2 }}
            >
              Connect with menus
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={chooseToConnectMenuIds}
              onChange={handleSelectMenu}
              input={<OutlinedInput label="Tag" />}
              renderValue={(value) => {
                const allMenus = chooseToConnectMenuIds.map((ids) => {
                  return menus.find((menu) => menu.id === ids);
                });
                return allMenus.map((menu) => menu?.name).join(",");
              }}
            >
              {notConnectedMenus.map((menu) => (
                <MenuItem key={menu.id} value={menu.id}>
                  <Checkbox
                    checked={
                      menu.id && chooseToConnectMenuIds.includes(menu.id)
                        ? true
                        : false
                    }
                  />
                  <ListItemText primary={menu.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" onClick={connectMenus}>
            Connect
          </Button>
        </Box>
        {/* {end connect with menus/////////////////} */}
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
                onClick={() => removeFromCategories(data.id)}
              >
                Remove
              </Button>
            </section>
          );
        })}
      </Box>
    </Box>
  );
  async function removeFromCategories(id: number) {
    const response = await fetch(
      `${config.backofficeUrl}/menuCategories/removeMenu?id=${id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          menuCategoriesId: updatingId,
          locationId: locationId,
        }),
      }
    );
    if (response.ok) {
      dispatch(removeMenuCategorie(id));
      // fetchData();
      dispatch(fetchMenuMenuCategoriesLocation());
      alert("Deleted");
    } else {
      alert("Error");
    }
  }
  async function updateMenuCategories(id: number) {
    if (!id) return;
    const response = await fetch(
      `${config.backofficeUrl}/menuCategories?id=${id}`,
      {
        method: "PUT",
        body: JSON.stringify(updateMenuCategorie),
      }
    );
    if (response.ok) {
      dispatch(fetchMenuMenuCategoriesLocation());
    }
  }
  function handleChange(e: SelectChangeEvent<number[]>) {
    setUpdateMenuCategorie({
      ...updateMenuCategorie,
      selectedLocationIds: e.target.value as number[],
    });
    setSelectedLocations(e.target.value as number[]);
  }
  function handleSelectMenu(e: SelectChangeEvent<number[]>) {
    setChooseToConnectMenuIds(e.target.value as number[]);
  }
  async function connectMenus() {
    const response = await fetch(
      `${config.backofficeUrl}/menuCategories/connectMenu?id=${locationId}`,
      {
        method: "PUT",
        body: JSON.stringify({
          menuIds: chooseToConnectMenuIds,
          menuCategorieId: updatingId,
        }),
      }
    );
    if (response.ok) {
      // fetchData();
      dispatch(fetchMenuMenuCategoriesLocation());
      setChooseToConnectMenuIds([]);
    }
  }
}
