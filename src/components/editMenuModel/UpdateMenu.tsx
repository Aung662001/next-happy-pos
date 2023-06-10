import {
  Box,
  Button,
  Modal,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { Menu } from "../../typings/types";
import { BackofficeContext } from "../../contexts/BackofficeContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  menus: Menu;
  setMenus: Dispatch<SetStateAction<Menu>>;
}
export default function UpdateMenu({ open, setOpen, menus, setMenus }: Props) {
  const [selectedCategoriesIds, setSelectedCategoriesIds] = useState<number[]>(
    []
  );

  const { fetchData, menuCategories, menusMenuCategoriesLocations } =
    useContext(BackofficeContext);
  const [locationId, setLocationId] = useLocalStorage("locationId")!;
  //   const createMenu = async (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     if (menus.price === undefined) return;
  //     if (!menus?.name || menus?.price < 0) return;
  //     console.log(menus);
  //     if (menuImage) {
  //       const formData = new FormData();
  //       formData.append("files", menuImage as Blob);
  //       const response = await fetch(`${config.backofficeUrl}/assets`, {
  //         method: "POST",
  //         body: formData,
  //       });
  //       const responseJson = await response.json();
  //       const asseturl = responseJson.assetUrl;
  //       menus.asseturl = asseturl;
  //     }

  //     await fetch(`${config.backofficeUrl}/menus?locationId=${locationId}`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(menus),
  //     });
  //     fetchData();
  //   };
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  const handleChange = (e: SelectChangeEvent<number[] | []>) => {
    const currentCategory = e.target.value as number[];
    setSelectedCategoriesIds(currentCategory);
    setMenus({ ...menus, menuCategoriesIds: currentCategory });
  };

  const CategoriesIds = menusMenuCategoriesLocations.filter(
    (mcl) => mcl.locations_id === locationId
  );

  const menuCategoriesAtCurrentLocation = menuCategories.filter((item1) => {
    return CategoriesIds.some((item2) => item1.id === item2.menu_categories_id);
  });
  function closeHandler() {
    setOpen(false);
  }
  return (
    <Modal
      open={open}
      onClose={closeHandler}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form onSubmit={(e) => null}>
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 300,
              m: "0 auto",
            }}
          >
            <h1 style={{ textAlign: "center" }}>Update menu</h1>
            <TextField
              label="Name*"
              variant="outlined"
              sx={{ mb: 2 }}
              value={menus.name}
              onChange={(event) => {
                setMenus({
                  name: event.target.value,
                  price: menus?.price ? menus.price : 0,
                  menuCategoriesIds: selectedCategoriesIds,
                });
              }}
            />
            <TextField
              label="Price*"
              variant="outlined"
              type="number"
              sx={{ mb: 2 }}
              value={menus.price ? menus.price : ""}
              onChange={(event) => {
                setMenus({
                  price: parseInt(event.target.value),
                  name: menus?.name ? menus.name : "",
                  menuCategoriesIds: selectedCategoriesIds,
                });
              }}
            />
            <TextField
              label="Description"
              variant="outlined"
              type="string"
              sx={{ mb: 2 }}
              value={menus.description}
              onChange={(event) => {
                setMenus({
                  price: menus.price ? menus.price : 0,
                  name: menus?.name ? menus.name : "",
                  menuCategoriesIds: menus.menuCategoriesIds,
                  description: event.target.value,
                });
              }}
            />
            {/* <FormControl sx={{ mb: 1, width: 300 }} required>
              <InputLabel
                id="demo-multiple-checkbox-label"
                sx={{ backgroundColor: "white", px: 2 }}
              >
                Menu Categoriey
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={menus.menuCategoriesIds}
                onChange={handleChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(value) => {
                  const selectedCategory = menus.menuCategoriesIds!.map(
                    (selectedCategoryId) => {
                      return menuCategories.find(
                        (menuCategory) => menuCategory.id === selectedCategoryId
                      );
                    }
                  );
                  return selectedCategory
                    .map((category) => category?.name)
                    .join(",");
                }}
              >
                {menuCategoriesAtCurrentLocation.map((menuCategory) => (
                  <MenuItem key={menuCategory.id} value={menuCategory.id}>
                    <Checkbox
                      checked={
                        menuCategory.id &&
                        selectedCategoriesIds.includes(menuCategory.id)
                          ? true
                          : false
                      }
                    />
                    <ListItemText primary={menuCategory.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}

            <Button variant="contained" type="submit" sx={{ marginTop: 3 }}>
              Create
            </Button>
          </Box>
        </Box>
      </form>
    </Modal>
  );
}
