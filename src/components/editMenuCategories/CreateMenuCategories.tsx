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
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { config } from "@/config/config";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { AppData } from "@/store/slices/appSlice";
import { addMenuCategorie } from "@/store/slices/menuCategoriesSlict";
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

export default function CreateMenuCategories({
  open,
  setOpen,
  updatingId,
  setUpdationgId,
  newMenuCategories,
  setNewMenuCategories,
  selectedLocationIds,
  setSelectedLocationIds,
}: Props) {
  const dispatch = useAppDispatch();
  const { menuCategories, menus, menusMenuCategoriesLocations, Locations } =
    useAppSelector(AppData);
  const [connectedMenuIds, setConnectedMenuIds] = useState<number[]>([]);
  const menuIds = menusMenuCategoriesLocations
    .filter(
      (mcl) => mcl.menu_categories_id === updatingId && mcl.menus_id !== null
    )
    .map((m) => m.menus_id);
  async function createNewMenuCategories() {
    setOpen(false);
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
    // fetchData();
    const jsonData = await response.json();
    if (jsonData) {
      dispatch(addMenuCategorie(jsonData));
    }
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

  const closeDialog = () => {
    setOpen(false);
    setNewMenuCategories({
      name: "",
      selectedLocationIds: [],
    });
    setSelectedLocationIds([]);
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
            onClick={() => createNewMenuCategories()}
            sx={{ height: "3rem", width: "150px" }}
          >
            ADD
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
