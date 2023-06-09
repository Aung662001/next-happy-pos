import {
  Box,
  Button,
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
} from "@mui/material";
import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import Locations from "../Locations";
import { config } from "@/config/config";
import { BackofficeContext } from "@/contexts/BackofficeContext";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  setIsUpdate: (value: boolean) => void;
  isUpdate: boolean;
  setUpdationgId: Dispatch<SetStateAction<number | null | undefined>>;
  updatingId: number | null | undefined;
  newMenuCategories: newMenuCategories;
  setNewMenuCategories: Dispatch<SetStateAction<newMenuCategories>>;
  selectedLocationIds: number[];
  setSelectedLocationIds: (value: SetStateAction<number[]>) => void;
}
interface newMenuCategories {
  name: string;
  selectedLocationIds: number[] | null;
}

export default function EditMenuCategories({
  open,
  setOpen,
  isUpdate,
  setIsUpdate,
  updatingId,
  setUpdationgId,
  newMenuCategories,
  setNewMenuCategories,
  selectedLocationIds,
  setSelectedLocationIds,
}: Props) {
  const { menuCategories, fetchData, menusMenuCategoriesLocations, Locations } =
    useContext(BackofficeContext);

  async function createNewMenuCategories() {
    if (newMenuCategories.selectedLocationIds === null) return;
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
  const handleChange = (e: SelectChangeEvent<number[] | []>) => {
    const currentLocation = e.target.value as number[];
    setSelectedLocationIds(currentLocation);
    setNewMenuCategories({
      name: newMenuCategories.name ? newMenuCategories.name : "",
      selectedLocationIds: currentLocation,
    });
  };
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
  const closeDialog = () => {
    setOpen(false);
    setNewMenuCategories({
      name: "",
      selectedLocationIds: [],
    });
    setSelectedLocationIds([]);
    setIsUpdate(false);
  };
  return (
    <Dialog open={open} onClose={closeDialog}>
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
                updatingId ? deleteHandler(updatingId) : alert("cannot delete")
              }
            >
              Delete
            </Button>
          )}
        </Box>
      </Box>
    </Dialog>
  );
}
